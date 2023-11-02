import { Router } from "express";

const login = Router();

login.get("/", function (req, res, next) {
  res.render("home");
});

export { login };
