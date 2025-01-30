// Se importa bcrypt para el hashing de contraseñas
const bcrypt = require('bcryptjs');


// Se importa jsonwebtoken para la generación y verificación de tokens JWT
const jwt = require('jsonwebtoken');


// Se importa el modelo de Usuario para interactuar con la base de datos
const User = require('../models/User');


// Controlador de registro de usuarios
exports.register = async (req, res) => {
    console.log('Cuerpo recibido:', req.body); // Muestra el contenido del cuerpo de la solicitud para depuración


    // Se extraen los campos necesarios del cuerpo de la solicitud
    const { name, email, password } = req.body;
  
  
    // Validación: asegura que todos los campos requeridos estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
  
    try {
      // Se genera un hash de la contraseña proporcionada por el usuario
      const hashedPassword = await bcrypt.hash(password, 10);
  
  
      // Se crea un nuevo usuario con los datos proporcionados y la contraseña hasheada
      const newUser = new User({ name, email, password: hashedPassword });
  
  
      // Se guarda el nuevo usuario en la base de datos
      await newUser.save();
  
  
      // Responde con un mensaje indicando que el registro fue exitoso
      res.status(201).json({ message: 'Usuario registrado con éxito.' });
    }catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Error de validación.', details: err.errors });
      } else if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({ message: 'Ya existe un registro con esos datos.' });
      } else {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor.', error: err.message });
      }
    }
  
  
  };
  
  
  // Controlador de inicio de sesión
  exports.login = async (req, res) => {
     // Se extraen los campos necesarios del cuerpo de la solicitud
  const { email, password } = req.body;


  // Validación: asegura que todos los campos requeridos estén presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }


  try {
    // Se busca un usuario con el correo proporcionado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }


    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }


    // Si la contraseña coincide, genera un token JWT con los datos del usuario
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Datos incluidos en el token
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Tiempo de expiración del token
    );


    // Responde con el token generado y un mensaje de éxito
    res.json({ token, message: 'Inicio de sesión exitoso.' });
  } catch (err) {
    console.error(err); // Muestra errores de servidor en la consola
    res.status(500).json({ message: 'Error en el servidor.' }); // Responde con un error interno del servidor
  }
};
// Controlador de inicio de sesión
  
