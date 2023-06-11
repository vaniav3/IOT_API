import mongoose from "mongoose";

const mongoURL = "mongodb://root:pass@localhost:2600/iot?authSource=admin";

export async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log("Conexión exitosa a la base de datos");
    return mongoose.connection;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}
