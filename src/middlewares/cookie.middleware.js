exports.opcionalHttpOnlyCookie = (req, res, next) => {
  // Guardamos la función res.json original de Express
  const originalJson = res.json;

  // Sobrescribimos res.json temporalmente para interceptar la respuesta del login
  res.json = function (data) {
    // Si el cliente envió el header 'x-use-cookie: true' y la respuesta incluye un token
    const usaCookie = req.headers['x-use-cookie'] === 'true';

    if (usaCookie && data && data.token) {
      res.cookie('token', data.token, {
        httpOnly: true, // Evita lectura por JS (protección XSS)
        secure: process.env.COOKIE_SECURE === 'true', // Solo HTTPS en producción
        sameSite: process.env.COOKIE_SAMESITE || 'none',
        maxAge: 8 * 60 * 60 * 1000 // 8 Horas (mismo tiempo que el JWT)
      });
    }

    // Ejecuta la respuesta JSON normal hacia el cliente
    return originalJson.call(this, data);
  };

  next();
};