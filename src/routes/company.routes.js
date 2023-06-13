const { Router } = require('express');
const {addCompany, getCompanies} = require('../controllers/company.js');
const {authenticateTokenRoot} = require('../middleware/jwt.js');

const router = Router();

router.post('/add', authenticateTokenRoot, addCompany)
router.get('/', authenticateTokenRoot, getCompanies)

module.exports = router;