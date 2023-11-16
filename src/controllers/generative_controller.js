import { response } from "express";
import { pool } from "../common/connection.js";
import "dotenv/config.js";

const find = (req, res = response) => {
  pool.query(
    `
      SELECT * FROM sections;
    `,
    [],
    function (err, result, fields) {
      // Si no se encuentran resultados, devuelve un código de estado 404 y un mensaje de error
      result.length == 0
        ? res.status(404).json({ response: process.env.DEFAULT })
        : res.json(result);
    }
  );
};

const findone = (req, res = response) => {
  pool.query(
    `SELECT * FROM sections 
     WHERE id = ?`,
    [req.params.id],

    function (err, result, fields) {
      result.length == 0
        ? res.status(404).json({ response: process.env.DEFAULT })
        : res.json(result);
    }
  );
};

export { find, findone };
