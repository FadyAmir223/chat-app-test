import express from 'express';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { findOrCreateUser, getUser } from '../../models/users.model.js';

const local = express.Router();

local.post('/signup', async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (!(email && username && password && confirmPassword))
    return res.status(400).json({ message: 'empty field' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'unmatched password' });

  const usernameExist = await getUser(username);
  if (usernameExist?.username)
    return res.status(409).json({ message: 'username already exist' });

  const hashPassword = bcrypt.hashSync(password, 10);

  await findOrCreateUser({ username, email, password: hashPassword });
  return res.status(201).json({ message: 'user created' });
});

local.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({ user: req.user });
});

passport.use(
  new localStrategy(async (username, password, done) => {
    const user = await getUser(username);
    if (!user) return done(null, false, { message: "username doesn't exixt" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'incorrect password' });
      return done(null, user.username);
    });
  })
);

export default local;
