// Se importa la librería `jsonwebtoken` para trabajar con tokens JWT
const jwt = require('jsonwebtoken');


// Middleware de autenticación
const auth = (req, res, next) => {
  // Se obtiene el token desde el encabezado `Authorization`.
  // Si el encabezado existe, se quita la parte "Bearer " para obtener solo el token.
  const token = req.header('Authorization')?.replace('Bearer ', '');
 // Si no hay token, se responde con un estado 401 (no autorizado) y un mensaje de error
 if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });


 try {
   // Se verifica el token utilizando la clave secreta (JWT_SECRET) definida en las variables de entorno
   const verified = jwt.verify(token, process.env.JWT_SECRET);


   // Si la verificación es exitosa, se adjunta la información del token al objeto `req.user`.
   // Esto permite acceder a los datos del usuario autenticado en las siguientes capas del middleware o en el controlador.
   req.user = verified;


   // Llama a `next()` para pasar al siguiente middleware o controlador
   next();
 } catch (err) {
   // Si la verificación falla (por ejemplo, el token es inválido o ha expirado), se responde con un estado 400 y un mensaje de error
   res.status(400).json({ message: 'Token no válido.' });
 }
};


// Exporta el middleware para que pueda ser usado en otras partes de la aplicación
module.exports = auth;


