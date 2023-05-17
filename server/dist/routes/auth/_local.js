import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../../models/users.mongo.js';
import { findOrCreateUser } from '../../models/users.model.js';
async function localSignup(req, res) {
    const { email, username, password, confirmPassword } = req.body;
    if (!(email &&
        username &&
        password &&
        confirmPassword &&
        password == confirmPassword))
        return res
            .status(400)
            .json({ message: 'empty field or unmatched passwords' });
    const hashPassword = bcrypt.hashSync(password, 10);
    findOrCreateUser({ username, email, password: hashPassword });
    return res.status(201).json({ message: 'user created' });
}
passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err)
                return done(err);
            if (!isMatch)
                return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        });
    });
}));
export { localSignup };
