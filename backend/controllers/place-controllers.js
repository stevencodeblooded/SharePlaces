const uuid = require('uuid')

//This is the modal to replace the dummy places
const Place = require('../models/place')

let DUMMY_PLACES = [{
    id: 1,
    title: 'The State House of Kenya',
    description: 'This is the official residence of the Kenyan President',
    location: {
        lat: 40.4888,
        lng: -23.4884
    },
    address: 'Wabera ST',
    creator: 'u1'
}]


//GET PLACES BY ID------------------modal.findById()---------------------------
const getPlacesById = (req, res, next) => {
    const placeId = req.params.pid

    const place = DUMMY_PLACES.find(p => {
        return p.id === parseInt(placeId)
    })

    if (!place) {
        return res.status(404).json({message: 'No Place with that ID'})
    }

    res.json({ place })
}


//GET PLACES BY USER ID----------modal.find()-------------
const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid 
    const places = DUMMY_PLACES.find(p => p.creator === userId)

    if (!places) {
        return res.status(404).json({message: 'No Places with that UserID can be found'})
    }

    res.json({places})
}


//CREATE PLACE---------------------modale.save()-------------------
const createPlace = (req, res, next) => {
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
}  


//UPDATE PLACE--------------modal.save()--------------------
const updatePlace = (req, res, next) => {
    const placeId = req.params.pid
    const {title, description} = req.body

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)

    updatedPlace.title = title
    updatedPlace.description = description

    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({ place: updatedPlace}) 
}


//DELETE PLACE ----------------modal.remove()-----------------
const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({ message: 'Deleted Place Successfully'})
}

exports.getPlacesById = getPlacesById
exports.getPlacesByUserId = getPlacesByUserId
exports.createdPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace