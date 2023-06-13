const express = require('express');
const router = express.Router();
const { addSensorData, getLocationApi, getSensorApi, getSensorData } = require('../controllers/api.js');


router.get('/sensor_data', getSensorData);
router.post('/sensor_data', addSensorData);
router.get('/location', getLocationApi)
router.get('/sensor', getSensorApi)

module.exports = router;