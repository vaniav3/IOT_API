import { Router } from "express";
import { loggin, register } from "../controllers/admin.js";
const router = Router();

router.post('/login', loggin)
router.post('/register', register)

export default router;