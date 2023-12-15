import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import { pool } from '../common/connection.js';

const MySQLStore = MySQLStoreFactory(session);

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const sessionStore = new MySQLStore({ table: 'webGIA_Sessions'}, pool);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: "lax",
    maxAge: TWO_HOURS_IN_MS,
  },
});

export { sessionMiddleware };