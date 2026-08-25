const estudianteService = require('../services/estudiante.service');

exports.crear = async (req, res) => {
    try {
        const resultado = await estudianteService.crearEstudiante(req.body);
        res.status(201).json(resultado);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const pagina = parseInt(req.query.page) || 1;
        const limite = parseInt(req.query.limit) || 10;
        const resultado = await estudianteService.listarEstudiantes(req.query, pagina, limite);
        res.status(200).json(resultado);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.obtenerUno = async (req, res) => {
    try {
        const resultado = await estudianteService.buscarEstudiantePorId(req.params.id);
        if (!resultado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json(resultado);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.actualizar = async (req, res) => {
    try {
        const resultado = await estudianteService.modificarEstudiante(req.params.id, req.body);
        if (!resultado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json(resultado);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.eliminar = async (req, res) => {
    try {
        const resultado = await estudianteService.removerEstudiante(req.params.id);
        if (!resultado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};