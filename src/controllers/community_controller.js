import { response } from "express";
import { pool } from "../common/connection.js";
import "dotenv/config.js";

const find = (req, res = response) => {
  console.log('Im in fin with get community');
  pool.query(
    `SELECT community.*, users.email
      FROM community
      INNER JOIN users ON community.user_id = users.id;
      
      `,
    [],
    function (err, result, fields) {
      // Check for errors during the query
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check the length of the result before accessing its properties
      if (result && result.length > 0) {
        console.log(result);
        res.json(result);
      } else {
        res.status(404).json({ response: process.env.DEFAULT });
      }
    }
  );
};

const findone = (req, res = response) => {
  pool.query(
    `SELECT community.*, users.email
      FROM community
      INNER JOIN users ON community.user_id = users.id
      WHERE id_community= ?
      `,
    // Los parámetros para la consulta se obtienen del parámetro de ruta 'documento' de la solicitud
    [req.params.id],
    function (err, result, fields) {
      // Check for errors during the query
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check the length of the result before accessing its properties
      if (result && result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ response: process.env.DEFAULT });
      }
    }
  );
};

const create = (req, res = response) => {
  console.log('Hi, me dejaron crear un post');
  const { user_id, input, output, outimage, model_type, username } = req.body;
 
  pool.query(
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
