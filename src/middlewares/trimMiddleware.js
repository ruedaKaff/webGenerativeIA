const validateLength = (value, maxLength) => {
    return value.length <= maxLength;
  };
  

const trimMiddleware = (req, res, next) => {
  console.log("TRIMMING");
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Aplicar trim
        req.body[key] = req.body[key].trim();
        
        // Validar longitud máxima basada en el tipo de dato (255 para strings)
        if (!validateLength(req.body[key], 255)) {
          return res.status(400).json({ mensaje: 'Los campos de texto no pueden exceder los 255 caracteres' });
        }
      } else if (typeof req.body[key] === 'number') {
        // Validar longitud máxima basada en el tipo de dato (11 para números enteros)
        if (!validateLength(req.body[key].toString(), 11)) {
          return res.status(400).json({ mensaje: 'Los campos numéricos no pueden exceder los 11 dígitos' });
        }
      }
    }
    next();
  };
export  {
    trimMiddleware 
}