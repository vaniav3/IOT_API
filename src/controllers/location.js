import { pool } from "../database.js";

export const getLocations = async (req, res) => {
    try {
        const [rows] = await pool.promise().query("SELECT * FROM Location");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.promise().query("SELECT * FROM Location WHERE ID = ?", [id]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createLocation = async (req, res) => {
    try {
        const { company_id, location_name, location_country, location_city, location_meta } = req.body;
        
        //verifica la compañia 
        const [rows] = await pool.promise().query("SELECT * FROM Company WHERE ID = ?", [company_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }

        const insert = await pool.promise().query("INSERT INTO Location (company_id, location_name, location_country, location_city, location_meta) VALUES (?, ?, ?, ?, ?)", [company_id, location_name, location_country, location_city, location_meta]);
        
        if (insert[0].affectedRows === 0) {
            return res.status(400).json({ message: "Location not created" });
        }

        res.status(200).json({
            message: "Location created successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

// json para agregar una locacion
// {
//     "company_id": 1,
//     "location_name": "Bogota",
//     "location_country": "Colombia",
//     "location_city": "Bogota",
//     "location_meta": "Calle 123"
// }

export const editLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { company_id, location_name, location_country, location_city, location_meta } = req.body;

        //verifica la compañia 
        const [rows] = await pool.promise().query("SELECT * FROM Company WHERE ID = ?", [company_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }

        const update = await pool.promise().query("UPDATE Location SET company_id = ?, location_name = ?, location_country = ?, location_city = ?, location_meta = ? WHERE ID = ?", [company_id, location_name, location_country, location_city, location_meta, id]);
        
        if (update[0].affectedRows === 0) {
            return res.status(400).json({ message: "Location not found" });
        }

        res.status(200).json({
            message: "Location updated successfully",
        });

    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.promise().query("DELETE Location, Sensor, SensorData\
        FROM Location\
        LEFT JOIN Sensor ON Location.ID = Sensor.location_id\
        LEFT JOIN SensorData ON Sensor.ID = SensorData.sensor_id\
        WHERE Location.ID = ?;\
        ", [id]);
        if (rows.affectedRows === 0) {
            return res.status(400).json({ message: "Location not found" });
        }

        res.status(200).json({
            message: "Location deleted successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
}