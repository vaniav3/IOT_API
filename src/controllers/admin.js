const { pool } = require('../database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { LLAVE_JWT } = require('../helpers/env.helpers.js');

const loggin = async (req, res) => {
    const { user, password } = req.body;
  
    // Consulta para verificar las credenciales del usuario
    const query = `SELECT ID, Password FROM Admin WHERE Username = ?`;
  
    try {
      const [rows] = await pool.query(query, [user]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      const log = rows[0];

      const hashedPassword = log.Password;
  
      // Verificar la contraseña utilizando bcrypt
      const isMatch = await bcrypt.compare(password, hashedPassword);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Generar el token de autenticación utilizando JWT
      const token = jwt.sign({ userId: log.ID }, LLAVE_JWT, { expiresIn: '1h' });
  
      res.json({ token });

    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
}
const register = async (req, res) => {
    const { user, password } = req.body;
  
    // Consulta para verificar si el usuario ya existe
    const query = `SELECT ID FROM Admin WHERE Username = ?`;
  
    try {
      const [rows] = await pool.query(query, [user]);
  
      if (rows.length > 0) {
        return res.status(401).json({ message: 'El usuario ya existe' });
      }
  
      // Encriptar la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Consulta para crear el usuario
      const insert = `INSERT INTO Admin (Username, Password) VALUES (?, ?)`;
  
      await pool.query(insert, [user, hashedPassword]);
  
      res.json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = { 
    loggin,
    register
};