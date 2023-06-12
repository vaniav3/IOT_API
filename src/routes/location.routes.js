import { Router } from "express";
import { editLocation, getLocations, getLocation, deleteLocation } from "../controllers/location.js";

const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocation); 
router.put('/edit/:id', editLocation);
router.delete('/delete/:id', deleteLocation)

export default router;