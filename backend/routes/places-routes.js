const express = require('express')
const router = express.Router()

//CONTROLLERS
const placeControllers = require('../controllers/place-controllers')

//------------------------ROUTES----------------------------

router.get('/:pid', placeControllers.getPlacesById)
router.get('/users/:uid', placeControllers.getPlacesByUserId)
router.post('/', placeControllers.createdPlace)
router.patch('/:pid', placeControllers.updatePlace)
router.delete('/:pid', placeControllers.deletePlace)

module.exports = router