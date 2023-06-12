import { Schema } from "mongoose";
import { connectToDatabase } from "./init-mongo.js";

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const companySchema = new Schema({
  company_name: { type: String, required: true },
  company_api_key: { type: String, required: true },
  locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
});

const locationSchema = new Schema({
  company_id: { type: Number, required: true },
  location_name: { type: String, required: true },
  location_country: { type: String, required: true },
  location_city: { type: String, required: true },
  location_meta: { type: String },
});

const sensorSchema = new Schema({
  location_id: { type: Number, required: true },
  sensor_id: { type: Number, required: true },
  sensor_name: { type: String, required: true },
  sensor_category: { type: String, required: true },
  sensor_meta: { type: String },
  sensor_api_key: { type: String, required: true },
});

// Esquema dinámico para los datos del sensor (Sensor Data)
const sensorDataSchema = new Schema(
  {
    sensor: {
      type: Schema.Types.ObjectId,
      ref: "Sensor",
      required: true,
    },
  },
  { strict: false }
);

const connection = await connectToDatabase();
export const Admin = connection.model("Admin", adminSchema, "Admin");
export const Company = connection.model("Company", companySchema, "Company");
export const Location = connection.model("Location", locationSchema, "Location");
export const Sensor = connection.model("Sensor", sensorSchema, "Sensor");
export const SensorData = connection.model("SensorData", sensorDataSchema, "SensorData");
