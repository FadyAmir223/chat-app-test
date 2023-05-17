import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { checkLoggedIn, checkPermissions } from './checks.js';
import './passport-setup.js';
import refreshTokenMiddleware from './refresh.js';
import { CLIENT_URL, CLIENT_PORT, SESSION_KEY_1, SESSION_KEY_2, } from '../../utils/loadEnv.js';
import { localSignup } from './_local.js';
const auth = express.Router();
auth.use(cookieSession({
    name: 'user',
    keys: [SESSION_KEY_1, SESSION_KEY_2],
}));
auth.use((req, res, next) => {
    if (req.session && !req.session.regenerate)
        req.session.regenerate = (cb) => {
            cb();
        };
    if (req.session && !req.session.save)
        req.session.save = (cb) => {
            cb();
        };
    next();
});
auth.use(passport.initialize());
auth.use(passport.session());
auth.post('/signup', localSignup);
auth.post('/login', passport.authenticate('local', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/chat`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
}));
auth.get('/logout', (req, res) => {
    req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});
auth.get('/secret', refreshTokenMiddleware, checkLoggedIn, checkPermissions, (req, res) => res.status(200).json(req.user));
export default auth;
