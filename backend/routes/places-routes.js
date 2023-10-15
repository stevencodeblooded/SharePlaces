const express = require('express')
const router = express.Router()

const uuid = require('uuid')

let DUMMY_PLACES = [{
    id: 1,
    title: 'The State House of Kenya',
    description: 'This is the official residence of the Kenyan President',
    location: {
        lat: 40.4888,
        lng: -23.4884
    },
    address: 'Wabera ST',
    creator: 'ul'
}]


//READING PLACES BASED ON PLACE ID 
router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid
    const place = DUMMY_PLACES.find(p => {
        return p.id === parseInt(placeId)
    })

    if (!place) {
        return res.status(404).json({message: 'No Place with that ID'})
    }

    res.json({ place })
})


//READING PLACES BASED ON USER ID/CREATOR
router.get('/users/:uid', (req, res, next) => {
    const userId = req.params.uid 
    const places = DUMMY_PLACES.find(p => p.creator === userId)

    if (!places) {
        return res.status(404).json({message: 'No Places with that UserID can be found'})
    }

    res.json({places})
})


//CREATING PLACES
router.post('/', (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body

    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({ places: createdPlace })
})


//UPDATE PLACES 
router.patch('/:pid', (req, res, next) => {
    const placeId = req.params.pid
    const {title, description} = req.body

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)

    updatedPlace.title = title
    updatedPlace.description = description

    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({ place: updatedPlace}) 
})


// DELETING PLACES BASED ON PLACE ID
router.delete('/:pid', (req, res, next) => {
    const placeId = req.params.pid
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({ message: 'Deleted Place Successfully'})
})

module.exports = router 