const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth.middleware');

router.use(verificarToken, permitirRoles('ADMIN', 'MANTENIMIENTO'));

router.post('/', estudianteController.crear);
router.get('/', estudianteController.obtenerTodos);
router.get('/:id', estudianteController.obtenerUno);
router.put('/:id', estudianteController.actualizar);
router.delete('/:id', estudianteController.eliminar);

module.exports = router;