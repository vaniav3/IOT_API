import { Admin, Company, Location, Sensor, SensorData } from "./models.js";

export async function createAdmin(username, password) {
  try {
    const nuevoAdmin = new Admin({ username, password });
    await nuevoAdmin.save();
    console.log("Administrador creado exitosamente.");
  } catch (error) {
    console.error("Error al crear el administrador:", error);
  }
}

export async function createCompany(nombre) {
  try {
    const nuevaCompania = new Company({ nombre });
    await nuevaCompania.save();
    console.log("Compañía creada exitosamente.");
  } catch (error) {
    console.error("Error al crear la compañía:", error);
  }
}

export async function createLocation(nombre, companyId) {
  try {
    const nuevoLugar = new Location({ nombre, companyId });
    await nuevoLugar.save();
    console.log("Lugar creado exitosamente.");
  } catch (error) {
    console.error("Error al crear el lugar:", error);
  }
}

export async function createSensor(nombre, locationId) {
    try {
      const nuevoSensor = new Sensor({ nombre, locationId });
      await nuevoSensor.save();
      console.log('Sensor creado exitosamente.');
    } catch (error) {
      console.error('Error al crear el sensor:', error);
    }
  }

export async function DatosSensor(sensorId, datos) {
  try {
    // Verificar si el sensor existe antes de crear los datos
    const sensor = await Sensor.findById(sensorId);
    if (!sensor) {
      console.error("El sensor no existe.");
      return;
    }

    const nuevosDatos = new SensorData({ sensor: sensorId, datos });
    await nuevosDatos.save();
    console.log("Datos del sensor creados exitosamente.");
  } catch (error) {
    console.error("Error al crear los datos del sensor:", error);
  }
}
