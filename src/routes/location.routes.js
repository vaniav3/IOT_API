import { Router } from "express";
import { editLocation, getLocations, createLocation, deleteLocation, getLocationById } from "../controllers/location.js";
import { authenticateTokenRoot } from "../middleware/jwt.js";

const router = Router();

router.get('/', authenticateTokenRoot, getLocations);
router.get('/:id', authenticateTokenRoot, getLocationById); 
router.post('/add', authenticateTokenRoot, createLocation);
router.put('/edit/:id', authenticateTokenRoot, editLocation);
router.delete('/delete/:id', authenticateTokenRoot, deleteLocation)

export default router;