import { pool } from "../database.js";
import { faker } from "@faker-js/faker";

export const seedDatabase = async (req, res) => {
    // Crear 4 a 14 compañías
    const companyCount = faker.random.numeric({ min: 4, max: 14 });
    for(let i = 0; i < companyCount; i++) {
        const companyName = faker.company.companyName();
        const companyApiKey = faker.datatype.uuid();
        await pool.promise().query('INSERT INTO Company (company_name, company_api_key) VALUES (?, ?)', [companyName, companyApiKey]);
    }

    // Obtener todas las compañías
    const [companies] = await pool.promise().query('SELECT ID FROM Company');

    // Para cada compañía, crear de 5 a 15 ubicaciones
    for(let company of companies) {
        const locationCount = faker.random.numeric({ min: 5, max: 15 });
        for(let i = 0; i < locationCount; i++) {
            const locationName = faker.address.streetName();
            const locationCountry = faker.address.country();
            const locationCity = faker.address.city();
            const locationMeta = faker.random.words();
            await pool.promise().query('INSERT INTO Location (company_id, location_name, location_country, location_city, location_meta) VALUES (?, ?, ?, ?, ?)', [company.ID, locationName, locationCountry, locationCity, locationMeta]);
        }
    }

    // Obtener todas las ubicaciones
    const [locations] = await pool.promise().query('SELECT ID FROM Location');

    // Para cada ubicación, crear de 20 a 30 sensores
    for(let location of locations) {
        const sensorCount = faker.random.numeric({ min: 20, max: 30 });
        for(let i = 0; i < sensorCount; i++) {
            const sensorName = faker.name.firstName();
            const sensorCategory = faker.helpers.arrayElement(["Humidity/Temperature", "Solar Radiation/Heat"]);
            const sensorMeta = faker.random.words();
            const sensorApiKey = faker.datatype.uuid();
            await pool.promise().query('INSERT INTO Sensor (location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (?, ?, ?, ?, ?)', [location.ID, sensorName, sensorCategory, sensorMeta, sensorApiKey]);
        }
    }

    // Obtener todos los sensores
    const [sensors] = await pool.promise().query('SELECT ID, sensor_category FROM Sensor');

    // Para cada sensor, crear de 40 a 50 datos
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    for(let sensor of sensors) {
        const dataCount = faker.random.numeric({ min: 40, max: 50 });
        for(let i = 0; i < dataCount; i++) {
            const humidity = (sensor.sensor_category == "Humidity/Temperature") ? faker.random.numeric() : null;
            const temperature = (sensor.sensor_category == "Humidity/Temperature") ? faker.random.numeric() : null;
            const solarRadiation = (sensor.sensor_category == "Solar Radiation/Heat") ? faker.random.numeric() : null;
            const solarHeat = (sensor.sensor_category == "Solar Radiation/Heat") ? faker.random.numeric() : null;
            const createDate = faker.datatype.datetime({
                min: oneYearAgo,
                max: today.getTime()
            });;
            await pool.promise().query('INSERT INTO SensorData (sensor_id, humidity, temperature, solar_radiation, solar_heat, create_date) VALUES (?, ?, ?, ?, ?, ?)', [sensor.ID, humidity, temperature, solarRadiation, solarHeat, createDate]);
        }
    }

    res.status(200).json({
        message: "Database seeded successfully",
    });
}

export const deleteAllData = async (req, res) => {
    try {
      await pool.promise().query('DELETE FROM SensorData');
      await pool.promise().query('DELETE FROM Sensor');
      await pool.promise().query('DELETE FROM Location');
      await pool.promise().query('DELETE FROM Company');
      // Agrega aquí más sentencias DELETE para otras tablas si es necesario
  
      res.status(200).json({
        message: "Datos eliminados correctamente",
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
