const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

// Endpoint público
router.post('/login', usuarioController.login);

// Endpoints protegidos exclusivamente para ADMIN
router.use(verificarToken, permitirRoles('ADMIN'));

router.post('/', usuarioController.crear);
router.get('/', usuarioController.obtenerTodos);
router.get('/:id', usuarioController.obtenerUno);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

module.exports = router;