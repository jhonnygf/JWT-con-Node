const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: { type: String, required: true }, // El nombre del usuario es obligatorio
    email: { type: String, required: true, unique: true }, // El email es obligatorio y debe ser único en la colección
    password: { type: String, required: true }, // La contraseña es obligatoria
}, { timestamps: true });





module.exports = mongoose.model('User', userSchema);
