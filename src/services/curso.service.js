const Curso = require('../models/curso.model');

exports.crearCurso = async (datosCurso) => {
    const nuevoCurso = new Curso(datosCurso);
    return await nuevoCurso.save();
};

exports.listarCursos = async () => {
    return await Curso.find();
};

exports.buscarCursoPorId = async (id) => {
    return await Curso.findById(id);
};

exports.modificarCurso = async (id, datosActualizados) => {
    return await Curso.findByIdAndUpdate(id, datosActualizados, { new: true });
};

exports.removerCurso = async (id) => {
    return await Curso.findByIdAndDelete(id);
};