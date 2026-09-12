const jwt = require('jsonwebtoken');

// Verificar validez del Token JWT
exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects: "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

// Control de Acceso Basado en Roles (RBAC)
exports.permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: 'Acceso prohibido: Permisos insuficientes'
      });
    }
    next();
  };
};