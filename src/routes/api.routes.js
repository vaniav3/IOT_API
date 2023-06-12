import { Router } from "express";
import { addSensorData, getLocationApi, getSensorApi, getSensorData } from "../controllers/api.js";

const router = Router();

router.get('/sensor_data', getSensorData);
router.post('/sensor_data', addSensorData);
router.get('/location', getLocationApi)
router.get('/sensor', getSensorApi)

export default router;