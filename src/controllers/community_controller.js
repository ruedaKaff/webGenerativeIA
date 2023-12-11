import { response } from "express";
import { pool } from "../common/connection.js";
import "dotenv/config.js";

const find = async (req, res = response, next) => {
  try {
    const [result] = await pool.query(`
      SELECT community.*, users.email
      FROM community
      INNER JOIN users ON community.user_id = users.id;
    `);
    // console.log("Query result:", result);
    if (result && result.length > 0) {
      res.send(result);
    } else {
      res.status(404).json({ response: process.env.DEFAULT });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const findone = async (req, res = response) => {
  try {
    const [result] = await pool.query(`
      SELECT community.*, users.email
      FROM community
      INNER JOIN users ON community.user_id = users.id
      WHERE id_community= ?;
    `, [req.params.id]);

    return result && result.length > 0
      ? res.json(result)
      : res.status(404).json({ response: process.env.DEFAULT });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const create = async (req, res = response, next) => {
  console.log("here");
  try {
    console.log('Hi, me dejaron ENTRAR A CREATE');
    const { user_id, input, output, outimage, model_type, username } = req.body;
    console.log("im destructuring the req => "+ req);
    await pool.query(
      `INSERT INTO community (user_id, input, output, outimage, model_type, username, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW());
      `,
      [user_id, input, output, outimage, model_type, username]
    );
    
    // 
    // return res.status(200).json({ message: 'Item created successfully' })
    console.log('item creado');
    return next()
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { find, findone, create};
