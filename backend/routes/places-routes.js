const express = require('express')
const router = express.Router()

//CONTROLLERS
const placeControllers = require('../controllers/place-controllers')


//------------------------ROUTES----------------------------

//READING PLACES BASED ON PLACE ID 
router.get('/:pid', placeControllers.getPlacesById)

//READING PLACES BASED ON USER ID/CREATOR
router.get('/users/:uid', placeControllers.getPlacesByUserId)

//CREATING PLACES
router.post('/', placeControllers.createdPlace)

//UPDATE PLACES 
router.patch('/:pid', placeControllers.updatePlace)

// DELETING PLACES BASED ON PLACE ID
router.delete('/:pid', placeControllers.deletePlace)

module.exports = router