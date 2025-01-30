const mongoose = require('mongoose');


const productSchema = mongoose.Schema(
    {
      name: { type: String, required: true }, // El nombre del producto es obligatorio y es de tipo texto
      price: { type: Number, required: true }, // El precio es obligatorio y es de tipo numérico
      description: { type: String }, // La descripción no es obligatoria, pero si se proporciona, es de tipo texto
      stock: { type: Number, default: 0 }, // El inventario es numérico, y si no se especifica, será 0 por defecto
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }, // Esto crea una relación con la colección 'User', indicando qué usuario creó este producto
    },
    { timestamps: true }
  );


module.exports = mongoose.model('Product', productSchema);