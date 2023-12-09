const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acesso não autorizado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'seu_segredo_secreto');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};


const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso não autorizado. O usuário não é um administrador.' });
  }
  next();
};

module.exports = { authenticateUser, checkAdmin };
