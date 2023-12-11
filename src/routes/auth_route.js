import { Router } from "express";
import UserController from "../controllers/users_controller.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import "dotenv/config.js";
// import { sessionMiddleware } from "../middlewares/sessionMiddleware.js";
import { isLoggedIn } from "../middlewares/isLoggedIN.js";

/////////////////////////////////////////////////////////////////////////////////////
const login = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9090/login/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserController.createUser(profile);
        // console.log(user);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.deserializeUser((id, done) => {
  console.log("deserializing user" + id);
  UserController.getUserById(id)
  .then((user) => done(null, user))
  .catch((err) => done(err));
});

passport.serializeUser((user, done) => {
  console.log("serializing user" + user.id);
  done(null, user.id);
});

login.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"], prompt: 'select_account' })
);

login.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login/auth/google/failure");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.save((err) => {
        if (err) {
          return next(err);
        }
        console.log(req.session);
        console.log({ "login/auth/google session id": req.sessionID });

        // Redirect to the protected page directly
        return res.redirect("http://localhost:3000/community");
      });
    });
  })(req, res, next);
});

login.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong!");
});

login.get("/auth/protected", (req, res) => {
  console.log({ "/auth/protected session id": req.sessionID });
  // let name = req.user.name;
  // res.send(`hello ${name} !`);
  console.log("protected are breaking");
});

login.get("/auth/session", isLoggedIn, async (req, res) => {

  const user = await UserController.getUserById(req.user);
  if (user === 0 ) {
    console.log("User does not exist");
    return res.status(404).send({ error: "User does not exist" });
  }
  res.send({ user: user });
});

login.use("/auth/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("http://localhost:3000/");
});

export { login };
