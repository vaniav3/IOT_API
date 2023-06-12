import { Router } from "express";
import { deleteAllData, seedDatabase } from "../controllers/faker.js";
const router = Router();

router.get('/', seedDatabase);
router.get('/delete', deleteAllData)

export default router;