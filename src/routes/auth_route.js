import { Router } from "express";
import passport from "passport";
import { connection } from "../common/connection.js";
import { Strategy as GoogleStrategy } from "passport-google-oidc";

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    async (issuer, profile, done) => {
      try {
        // Check if the user exists in your MySQL database
        const userRows = await queryAsync(
          "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
          [issuer, profile.id]
        );

        if (userRows.length === 0) {
          // User doesn't exist; insert into the database
          const insertUserResult = await queryAsync(
            "INSERT INTO users (name) VALUES (?)",
            [profile.displayName]
          );
          const userId = insertUserResult.insertId;
          await queryAsync(
            "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
            [userId, issuer, profile.id]
          );
          const user = { id: userId, name: profile.displayName };
          done(null, user);
        } else {
          // User exists; fetch user information
          const user = userRows[0];
          const userRowInUsersTable = await queryAsync(
            "SELECT * FROM users WHERE id = ?",
            [user.user_id]
          );
          if (userRowInUsersTable.length === 0) {
            done(null, false);
          } else {
            done(null, userRowInUsersTable[0]);
          }
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
const login = Router();

login.get("/", function (req, res, next) {
  res.render("login");
});

login.get("/federated/google", passport.authenticate("google"));

login.get("/signup", function (req, res, next) {
  res.render("signup");
});

login.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/generative",
    failureRedirect: "/login",
  })
);

export { login };
