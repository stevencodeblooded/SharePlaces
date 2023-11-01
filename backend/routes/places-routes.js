const express = require('express')
const router = express.Router()
const upload = require('../multer-config')

const placeControllers = require('../controllers/place-controllers')

router.get('/:pid', placeControllers.getPlacesById)
router.get('/users/:uid', placeControllers.getPlacesByUserId)
router.post('/', upload.single('image'), placeControllers.createdPlace)
router.patch('/:pid', placeControllers.updatePlace)
router.delete('/:pid', placeControllers.deletePlace)

module.exports = router