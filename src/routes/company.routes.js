import { Router } from "express";
import { addCompany, getCompanies } from "../controllers/company.js";
import { authenticateTokenRoot } from "../middleware/jwt.js";

const router = Router();

router.post('/add', authenticateTokenRoot, addCompany)
router.get('/', authenticateTokenRoot, getCompanies)

export default router;