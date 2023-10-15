import { response } from "express";
import { connection } from "../common/connection.js";
import "dotenv/config.js"


const find = (req, res = response) => {
    connection.query(
      // Realiza una consulta SQL para seleccionar todos los campos de los clientes y sus condiciones y medios de pago asociados
      `SELECT c.Documento,
      c.Documento, c.Nombre, c.Apellido1, c.Apellido2, c.Dirección, c.Teléfono, c.CorreoElectrónico, 
      c.Ciudad, cp.Nombre AS CondicionPago, c.ValorCupo, mp.Nombre AS MedioPago, c.Estado, c.FechaHoraAuditoria
      FROM CLIENTES c
      INNER JOIN CONDICION_PAGO cp ON c.CondicionPagoID = cp.ID
      INNER JOIN MEDIO_PAGO mp ON c.MedioPagoID = mp.ID;
      `,
      // Los parámetros para la consulta están vacíos, ya que esta consulta no necesita valores específicos
      [],
      function (err, result, fields) {
        // Si no se encuentran resultados, devuelve un código de estado 404 y un mensaje de error
        result.length == 0
        ? res.status(404).json({ response: process.env.DEFAULT })
        : res.json(result);
      }
    );
  };
  
  // Función para obtener un cliente por su número de documento
  const findone = (req, res = response) => {
    connection.query(
      // Realiza una consulta SQL para seleccionar los campos del cliente y sus condiciones y medios de pago asociados
      `SELECT c.Documento, c.Nombre, c.Apellido1, c.Apellido2, c.Dirección, c.Teléfono, c.CorreoElectrónico, c.Ciudad, cp.Nombre AS CondicionPago, c.ValorCupo, mp.Nombre AS MedioPago, c.Estado, c.FechaHoraAuditoria 
      FROM CLIENTES c 
      INNER JOIN CONDICION_PAGO cp ON c.CondicionPagoID = cp.ID 
      INNER JOIN MEDIO_PAGO mp ON c.MedioPagoID = mp.ID WHERE c.Documento = ?;
      `,
      // Los parámetros para la consulta se obtienen del parámetro de ruta 'documento' de la solicitud
      [req.params.documento],
      function (err, result, fields) {
        // Si no se encuentra el cliente, devuelve un código de estado 404 y un mensaje de error
        result.length == 0
        ? res.status(404).json({ response: process.env.DEFAULT })
        : res.json(result);
      }
    );
  };

  
export { find, findone };