import session from "express-session";

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: TWO_HOURS_IN_MS,
  },
});

export { sessionMiddleware };
