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

const create = (req, res = response) => {

  const { user_id, input, output, outimage, model_type, username } = req.body;
 
  connection.query(
    // Realiza una consulta SQL para insertar un nuevo community item en la tabla community con NOW() para FechaHoraAuditoria
    `INSERT INTO community ( user_id, input, output, outimage, model_type, username, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW());
    `,
    // Los valores para la consulta se obtienen de las variables extraídas del cuerpo de la solicitud
    [user_id, input, output, outimage, model_type, username],
    function (err, result, fields) {
      // Si ocurre un error, devuelve el mensaje de error; de lo contrario, devuelve el resultado de la inserción
      err 
      ? res.status(500).json({ error: err.message }) 
      : res.status(200).json({ message: 'Item creado exitosamente' });
    }
  );
};

export { find, findone, create};
