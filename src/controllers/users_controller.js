// userController.js
import { pool } from "../common/connection.js";
import { response } from "express";

const UserController = {
  createUser: async (req, res = response, profile) => {
    console.log('Helloooowoewoewo'+ profile);
    const { email, name, email_verified } = profile;

    try {
      // Check if the user already exists in the database based on email
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      if (existingUser.length > 0) {
        // User already exists, return a message indicating the user is already registered
        return res.status(400).json({ error: 'User already registered' });
      }

      // User doesn't exist, insert new user into the database
      const [result] = await pool.query('INSERT INTO users (email, name, email_verified) VALUES (?, ?, ?)', [email, name, email_verified]);

      // If the user is successfully created, return a success message
      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      // Handle any errors that occurred during the database operation
      return res.status(500).json({ error: error.message });
    }
  },
};

export default UserController;