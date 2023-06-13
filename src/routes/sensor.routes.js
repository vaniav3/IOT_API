const express = require('express');
const router = express.Router();
const { authenticateTokenRoot } = require('../middleware/jwt.js');
const { deleteSensor, editSensor, getSensors, createSensor, getSensorById } = require('../controllers/sensor.js');


router.get('/', authenticateTokenRoot, getSensors);
router.get('/:id', authenticateTokenRoot, getSensorById); 
router.post('/add', authenticateTokenRoot, createSensor);
router.put('/edit/:id', authenticateTokenRoot, editSensor);
router.delete('/delete/:id', authenticateTokenRoot, deleteSensor)

module.exports = router;