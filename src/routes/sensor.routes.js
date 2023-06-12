import { Router } from "express";
import { deleteSensor, editSensor, getSensors, createSensor, getSensorById } from "../controllers/sensor.js";
import { authenticateTokenRoot } from "../middleware/jwt.js";

const router = Router();

router.get('/', authenticateTokenRoot, getSensors);
router.get('/:id', authenticateTokenRoot, getSensorById); 
router.post('/add', authenticateTokenRoot, createSensor);
router.put('/edit/:id', authenticateTokenRoot, editSensor);
router.delete('/delete/:id', authenticateTokenRoot, deleteSensor)

export default router;