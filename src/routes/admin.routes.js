const { loggin, register } = require('../controllers/admin.js');

const express = require('express');
const router = express.Router();

router.post('/login', loggin)
router.post('/register', register)

module.exports = router;