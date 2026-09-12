require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../models/usuario.model');

const crearUsuarioInicial = async () => {
  try {
    // 1. Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB para la creación del usuario inicial...');

    // 2. Verificar si ya existe un usuario ADMIN
    const usuarioExistente = await Usuario.findOne({ rol: 'ADMIN' });

    if (usuarioExistente) {
      console.log('El usuario ADMIN ya existe en la base de datos.');
      process.exit(0);
    }

    // 3. Crear el usuario ADMIN por defecto
    const usuarioAdmin = new Usuario({
      nombre: 'Administrador Inicial',
      email: 'admin@correo.com',
      password: 'Admin123', // El modelo se encarga de encriptarla con bcrypt
      rol: 'ADMIN'
    });

    await usuarioAdmin.save();
    console.log('Usuario ADMIN creado con éxito:');
    console.log('Email: admin@correo.com');
    console.log('Password: Admin123');

  } catch (error) {
    console.error('Error al crear el usuario inicial:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

crearUsuarioInicial();