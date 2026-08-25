const cursoService = require('../services/curso.service');

exports.crear = async (req, res) => {
    try {
        const resultado = await cursoService.crearCurso(req.body);
        res.status(201).json(resultado);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const resultado = await cursoService.listarCursos();
        res.status(200).json(resultado);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.obtenerUno = async (req, res) => {
    try {
        const resultado = await cursoService.buscarCursoPorId(req.params.id);
        if (!resultado) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json(resultado);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.actualizar = async (req, res) => {
    try {
        const resultado = await cursoService.modificarCurso(req.params.id, req.body);
        if (!resultado) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json(resultado);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.eliminar = async (req, res) => {
    try {
        const resultado = await cursoService.removerCurso(req.params.id);
        if (!resultado) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};