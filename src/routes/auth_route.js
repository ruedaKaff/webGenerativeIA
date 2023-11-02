import { Router } from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc"

const login = Router();

login.get("/", function (req, res, next) {
  res.render("login");
});

login.get("/signup", function (req, res, next) {
  res.render("signup");
});

login.get("/federated/google",  passport.authenticate('google'));

export { login };
