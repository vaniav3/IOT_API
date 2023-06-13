const jwt = require('jsonwebtoken');
const { LLAVE_JWT } = require('../helpers/env.helpers.js');

const authenticateTokenRoot = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }
  
    jwt.verify(token, LLAVE_JWT, (err, user) => {
      if (err || user.userId !== 1) {
        return res.status(403).json({ message: 'El token de autenticación es inválido' });
      }
      
      console.log(user.userId);
      req.user = user;
      next();
    });
}

module.exports = {authenticateTokenRoot};