import { response } from "express";
import { connection } from "../common/connection.js";
import "dotenv/config.js";

const find = (req, res = response) => {
  connection.query(
    `SELECT community.*, users.user_identifier
      FROM community
      INNER JOIN users ON community.user_id = users.id;
      
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
  connection.query(
    `SELECT community.*, users.user_identifier
      FROM community
      INNER JOIN users ON community.user_id = users.id
      WHERE id_community= ?
      `,
    // Los parámetros para la consulta se obtienen del parámetro de ruta 'documento' de la solicitud
    [req.params.id],
    function (err, result, fields) {
      result.length == 0
        ? res.status(404).json({ response: process.env.DEFAULT })
        : res.json(result);
    }
  );
};

export { find, findone };
