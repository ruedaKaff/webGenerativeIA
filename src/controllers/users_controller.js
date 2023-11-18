// userController.js
import { pool } from "../common/connection.js";

const UserController = {
  createUser: async (profile) => {
    try {
      // console.log(profile._json);
      const { name, email, email_verified, picture, locale } = profile._json;
      // Check if the user already exists in the database based on email
      const [existingUser] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        // User already exists, update the user with Google data
        await pool.query(
          "UPDATE users SET  name = ? WHERE email = ?",
          [name, email]
        );

        // Retrieve and return the updated user
        const [updatedUser] = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );
        return updatedUser[0];
      } else {
        // User doesn't exist, insert a new user into the database
        const [result] = await pool.query(
          "INSERT INTO users (email, name, email_verified, picture, locale) VALUES (?, ?, ?, ?, ?)",
          [email, name, email_verified, picture, locale]
        );

        // Retrieve and return the newly inserted user
        const [newUser] = await pool.query(
          "SELECT * FROM users WHERE id = ?",
          [result.insertId]
        );
        return newUser[0];
      }
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  },
};

export default UserController;