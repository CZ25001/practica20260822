const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    creditos: { type: Number, default: 3 }
}, { timestamps: true });

module.exports = mongoose.model('Curso', CursoSchema);