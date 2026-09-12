const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

router.use(verificarToken, permitirRoles('ADMIN', 'MANTENIMIENTO'));

router.post('/', cursoController.crear);
router.get('/', cursoController.obtenerTodos);
router.get('/:id', cursoController.obtenerUno);
router.put('/:id', cursoController.actualizar);
router.delete('/:id', cursoController.eliminar);

module.exports = router;