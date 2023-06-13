const {pool} = require('../database.js');
const {v4: uuidv4} = require('uuid');

 const addCompany = async (req, res) => {
    const { company_name } = req.body;
    
    // Consulta para verificar si el usuario ya existe
    const query = `SELECT ID FROM Company WHERE company_name = ?`;
    
    try {
        const [rows] = await pool.query(query, [company_name]);
    
        if (rows.length > 0) {
        return res.status(401).json({ message: 'La compañía ya existe' });
        }
    
        // Consulta para crear el usuario
        const insertQuery = `INSERT INTO Company (company_name, company_api_key) VALUES (?, ?)`;
        
        const identity = uuidv4();
        const insert = await pool.query(insertQuery, [company_name, identity]);
        
        if (insert[0].affectedRows === 0) {
            return res.status(400).json({ message: 'Error al crear la compañía' });
        }

        res.json({ message: 'Compañía creada exitosamente' , data : { company_name, identity } });
    
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

 const getCompanies = async (req, res) => {
    const query = `SELECT * FROM Company`;
    
    try {
        const [rows] = await pool.query(query);
    
        if (rows.length === 0) {
        return res.status(404).json({ message: 'No hay compañías' });
        }
    
        res.json({ data : rows });
    
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = { 
    addCompany,
    getCompanies
}