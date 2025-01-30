const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth'); // Middleware de autenticación




// Obtener todos los productos (protegido)
router.get('/', auth, productController.getProducts);


// Crear un producto (protegido)
router.post('/', auth, productController.createProduct);


// Actualizar un producto (protegido)
router.put('/:id', auth, productController.updateProduct);


// Eliminar un producto (protegido)
router.delete('/:id', auth, productController.deleteProduct);


module.exports = router;
