import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkLoggedIn, checkPermissions } from './checks.js';
import { findOrCreateUser, getUser } from '../../models/users.model.js';

import {
  CLIENT_URL,
  CLIENT_PORT,
  SESSION_KEY_1,
  SESSION_KEY_2,
} from '../../utils/loadEnv.js';

const JWT_SECRET = 'dummyJWTSecretKey';
const JWT_EXPIRATION = 15 * 60;
const REFRESH_TOKEN_SECRET = 'dummyRefreshTokenSecretKey';
const REFRESH_TOKEN_EXPIRATION = 30 * 24 * 60 * 60 * 1000;

const auth = express.Router();

auth.post('/signup', async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (!(email && username && password && confirmPassword))
    return res.status(400).json({ message: 'empty field' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'unmatched password' });

  const usernameExist = await getUser(username);
  if (usernameExist?.username)
    return res.status(409).json({ message: 'username already exist' });

  await findOrCreateUser({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const accessToken = jwt.sign({ userId: username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  const refreshToken = jwt.sign({ userId: username }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  console.log({ accessToken, refreshToken });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: JWT_EXPIRATION * 1000,
    secure: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRATION * 1000,
    secure: true,
  });

  return res.status(200).json({ message: 'User registered successfully.' });
});

auth.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);
  if (!(user && (await bcrypt.compare(password, user.password))))
    return res.status(401).json({ message: 'Invalid username or password' });

  const accessToken = jwt.sign({ userId: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  const refreshToken = jwt.sign(
    { userId: user.username },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: JWT_EXPIRATION * 1000,
    secure: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRATION,
    secure: true,
  });

  return res.status(200).json({ message: 'Login successful' });
});

auth.get('/logout', (req, res) => {
  req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});

auth.get(
  '/secret',
  // refreshTokenMiddleware,
  // checkLoggedIn,
  // checkPermissions,
  (req, res) => res.status(200).json(req.user || { success: false })
);

export default auth;
