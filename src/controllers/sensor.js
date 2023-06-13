const { pool } = require("../database.js");
const { v4: uuidv4 } = require('uuid');

 const getSensors = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Sensor");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
}

 const getSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM Sensor WHERE ID = ?", [id]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

 const createSensor = async (req, res) => {
    try {
        const { location_id, sensor_name, sensor_category, sensor_meta } = req.body;
        
        //verifica la location 
        const [rows] = await pool.query("SELECT * FROM Location WHERE ID = ?", [location_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        const sensor_api_key = uuidv4();

        const insert = await pool.query("INSERT INTO Sensor (location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (?, ?, ?, ?, ?)", [location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key]);
        
        if (insert[0].affectedRows === 0) {
            return res.status(400).json({ message: "Sensor not created" });
        }

        res.status(200).json({
            message: "Sensor created successfully",
            sensor_api_key
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

// json para agregar un sensor
// {
//     "location_id": 1,
//     "sensor_name": "Sensor 1",
//     "sensor_category": "Temperatura",
//     "sensor_meta": "Sensor de temperatura",
// }

 const editSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { location_id, sensor_name, sensor_category, sensor_meta } = req.body;

        //verifica la location 
        const [rows] = await pool.query("SELECT * FROM Location WHERE ID = ?", [location_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        const insert = await pool.query("UPDATE Sensor SET location_id = ?, sensor_name = ?, sensor_category = ?, sensor_meta = ? WHERE ID = ?", [location_id, sensor_name, sensor_category, sensor_meta, id]);
        
        if (insert[0].affectedRows === 0) {
            return res.status(400).json({ message: "Sensor not updated" });
        }

        res.status(200).json({
            message: "Sensor updated successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

 const deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const insert = await pool.query("DELETE Sensor, SensorData\
        FROM Sensor\
        LEFT JOIN SensorData ON Sensor.ID = SensorData.sensor_id\
        WHERE Sensor.ID = ?;\
        ", [id]);
        
        if (insert[0].affectedRows === 0) {
            return res.status(400).json({ message: "Sensor not deleted" });
        }

        res.status(200).json({
            message: "Sensor deleted successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getSensors,
    getSensorById,
    createSensor,
    editSensor,
    deleteSensor
}