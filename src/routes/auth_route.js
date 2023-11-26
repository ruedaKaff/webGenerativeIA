import { Router } from "express";
import UserController from "../controllers/users_controller.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import "dotenv/config.js";
import { sessionMiddleware } from "../middlewares/sessionMiddleware.js";

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

passport.serializeUser((user, done) => {
  done(null, { id: user.id, name: user.name, email: user.email, picture: user.picture });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

/////////////////////////////////////////////////////////////////////////////////////
const login = Router();

login.use(sessionMiddleware);

login.get("/", function (req, res, next) {
  res.render("login");
});

login.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

login.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/community",
    failureRedirect: "/login/auth/google/failure",
  })
);

login.get("/auth/google/failure", (req, res) => {
  res.send("Something went wrong!");
});

login.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.name;
  res.send(`hello ${name} !`);
});

login.use("/auth/logout", (req, res) => {
  req.session.destroy();
  res.send("See you !");
});

export { login };
