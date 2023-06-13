const express = require('express');
const router = express.Router();
const {editLocation, getLocations, createLocation, deleteLocation, getLocationById} = require('../controllers/location.js');
const {authenticateTokenRoot} = require('../middleware/jwt.js');


router.get('/', authenticateTokenRoot, getLocations);
router.get('/:id', authenticateTokenRoot, getLocationById); 
router.post('/add', authenticateTokenRoot, createLocation);
router.put('/edit/:id', authenticateTokenRoot, editLocation);
router.delete('/delete/:id', authenticateTokenRoot, deleteLocation)

module.exports = router;