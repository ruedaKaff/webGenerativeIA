import { response } from "express";
import { pool } from "../common/connection.js";
import "dotenv/config.js";

const find = async (req, res = response) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM sections;`
    );
    //debugin
    console.log("Query result:", result);
    result.length > 0
      ? res.json(result)
      : res.status(404).json({ response: process.env.DEFAULT });
  
    } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const findone = async (req, res = response) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM sections WHERE id = ?`,
      [req.params.id]
    );

    // Debugging
    console.log("Query result:", result);

    result.length === 0
      ? res.status(404).json({ response: process.env.DEFAULT })
      : res.json(result);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { find, findone };