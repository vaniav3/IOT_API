const express = require('express');
const router = express.Router();
const { deleteAllData, seedDatabase } = require('../controllers/faker.js');


router.get('/', seedDatabase);
router.get('/delete', deleteAllData)

module.exports = router;