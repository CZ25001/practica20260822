const express = require('express');
const cors = require('cors');

const estudianteRoutes = require('./routes/estudiante.routes');
const cursoRoutes = require('./routes/curso.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // O especifica tu frontend (ej: 'http://localhost:5173')
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Aplicar CORS globalmente
app.use(express.json());

// Registro de Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);

module.exports = app;