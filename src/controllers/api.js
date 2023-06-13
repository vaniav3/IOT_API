import { pool } from "../database.js";


export const addSensorData = async (req, res) => {
    try {
        const { sensor_api_key, json_data } = req.body;
        
        const [rows] = await pool.promise().query("SELECT * FROM Sensor WHERE sensor_api_key = ?", [sensor_api_key]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Sensor not found" });
        }

        for(let i = 0; i < json_data.length; i++){
            const dato = json_data[i];
            const insert = await pool.promise().query("INSERT INTO SensorData (sensor_id, humidity, temperature, solar_radiation, solar_heat, create_date) VALUES (?, ?, ?, ?, ?, ?)", [rows[0].ID, dato.humidity, dato.temperature, dato.solar_radiation, dato.solar_heat, new Date()]);
            if (insert[0].affectedRows === 0) {
                return res.status(400).json({ message: "SensorData not created" });
            }
        }     

        res.status(201).json({
            message: "SensorData created successfully",
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

//muestra de json_data
// [
//     {
//         "humidity": 0.5,
//         "temperature": 0.5,
//         "solar_radiation": 0.5,
//         "solar_heat": 0.5
//     },
//     {
//         "humidity": 0.5,
//         "temperature": 0.5,
//         "solar_radiation": 0.5,
//         "solar_heat": 0.5
//     }
// ]

export const getSensorData = async (req, res) => {
    try {

        const { company_api_key, from, to, sensor_id } = req.query;


        console.log(req.query)
        // console.log(typeof sensor_id)
        //sensor_id = [1,2,3,4,5,6,7,8,9,10]

        // fecha sensor
        // 1 1
        // 1 0
        // 0 1
        // 0 0

        if( company_api_key === undefined){
            return res.status(400).json({ message: "sensor_api_key is required" });  
        }
        else if((from === undefined || to === undefined) && sensor_id === undefined){
            const query = "SELECT SensorData.*\
            FROM SensorData\
            INNER JOIN Sensor ON SensorData.sensor_id = Sensor.ID\
            INNER JOIN Location ON Sensor.location_id = Location.ID\
            INNER JOIN Company ON Location.company_id = Company.ID\
            WHERE Company.company_api_key = ?";
            
            const [rows] = await pool.promise().query(query, [company_api_key]);
            
            if (rows.length === 0) {
                return res.status(400).json({ message: "SensorData not found" });
            }

            res.status(201).json({
                message: "SensorData found successfully",
                data : rows
            });
        }
        else if((from === undefined || to === undefined) && sensor_id !== undefined)
        {
            const arr = JSON.parse(sensor_id); 

            if(typeof arr == 'object')
            {
                const query = "SELECT SensorData.* FROM SensorData INNER JOIN Sensor ON SensorData.sensor_id = Sensor.ID INNER JOIN Location ON Sensor.location_id = Location.ID INNER JOIN Company ON Location.company_id = Company.ID WHERE Company.company_api_key = ? AND Sensor.ID IN (?);";

                const [rows] = await pool.promise().query(query, [company_api_key, arr]);

                if (rows.length === 0) {
                    return res.status(400).json({ message: "SensorData not found" });
                }

                res.status(201).json({
                    message: "SensorData found successfully",
                    data : rows
                });
            }
        }
        else if((from !== undefined && to !== undefined) && sensor_id === undefined)
        {
            const query = "SELECT SensorData.*\
                FROM SensorData\
                INNER JOIN Sensor ON SensorData.sensor_id = Sensor.ID\
                INNER JOIN Location ON Sensor.location_id = Location.ID\
                INNER JOIN Company ON Location.company_id = Company.ID\
                WHERE Company.company_api_key = ? AND SensorData.create_date BETWEEN ? AND ?";

            const desde = new Date(from * 1000)
            const hasta = new Date(to * 1000)

            const [rows] = await pool.promise().query(query, [company_api_key, desde, hasta]);

            if (rows.length === 0) {
                return res.status(400).json({ message: "SensorData not found" });
            }

            res.status(201).json({
                message: "SensorData found successfully",
                data : rows
            });

        }
        else if((from !== undefined && to !== undefined) && sensor_id !== undefined)
        {
            const arr = JSON.parse(sensor_id);

            if(typeof arr == 'object')
            {
                const query = "SELECT SensorData.*\
                    FROM SensorData\
                    INNER JOIN Sensor ON SensorData.sensor_id = Sensor.ID\
                    INNER JOIN Location ON Sensor.location_id = Location.ID\
                    INNER JOIN Company ON Location.company_id = Company.ID\
                    WHERE Company.company_api_key = ? \
                        AND SensorData.create_date BETWEEN ? AND ?\
                        AND SensorData.sensor_id IN (?)\
                    ";

                const desde = new Date(from * 1000)
                const hasta = new Date(to * 1000)
                
                const [rows] = await pool.promise().query(query, [company_api_key, desde, hasta, arr]);

                if (rows.length === 0) {
                    return res.status(400).json({ message: "SensorData not found" });
                }

                res.status(201).json({
                    message: "SensorData found successfully",
                    data : rows
                });
            }
        }
        else {
            return res.status(400).json({ message: "sensor_api_key is required" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getLocationApi = async (req, res) => {
    try {
        const { company_api_key } = req.query;

        if( company_api_key === undefined){
            return res.status(400).json({ message: "company_api_key is required" });  
        }
        else {
            const query = "SELECT Location.* FROM Location INNER JOIN Company ON Location.company_id = Company.ID WHERE Company.company_api_key = ?;";

            const [rows] = await pool.promise().query(query, [company_api_key]);

            if (rows.length === 0) {
                return res.status(400).json({ message: "Location not found" });
            }

            res.status(201).json({
                message: "Location found successfully",
                data : rows
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getSensorApi = async (req, res) => {
    try {
        const { company_api_key } = req.query;

        if( company_api_key === undefined){
            return res.status(400).json({ message: "company_api_key is required" });  
        }
        else {
            const query = "SELECT Sensor.* FROM Sensor INNER JOIN Location ON Sensor.location_id = Location.ID INNER JOIN Company ON Location.company_id = Company.ID WHERE Company.company_api_key = ?;";

            const [rows] = await pool.promise().query(query, [company_api_key]);

            if (rows.length === 0) {
                return res.status(400).json({ message: "Sensor not found" });
            }

            res.status(201).json({
                message: "Sensor found successfully",
                data : rows
            });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}