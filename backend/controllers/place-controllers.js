const mongoose = require('mongoose')
const Place = require('../models/place')
const User = require('../models/users')

//GET PLACES BY ID------------------modal.findById()---------------------------
const getPlacesById = async (req, res, next) => {
    const placeId = req.params.pid

    let place;
    try {
        place = await Place.findById(placeId)
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong, could not find place by id'})
    }

    if (!place) {
        return res.status(404).json({message: 'No Place with that ID'})
    }

    res.json({ place: place.toObject({ getters: true }) }).status(200)
}


//GET PLACES BY USER ID----------modal.find()-------------
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid 

    let places;

    try {
        places = await Place.find({ creator: userId})
    } catch (error) {
        return res.status(500).json({message: 'Fetching places failed, Try again later'})
    }

    if (!places || places.length === 0 ) {
        return res.status(404).json({message: 'Could not find places for the specified user id'})
    }

    res.json({ places: places.map(p => p.toObject({ getters: true }))}).status(200)
}


//CREATE PLACE---------------------modale.save()-------------------
const createPlace = async (req, res, next) => {
    const {title, description, address, creator} = req.body

    const createdPlace = new Place({
        title,
        description,
        address,
        creator,
        image: 'data:image/jpeg;base64,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'
    })

    let user;
    try {
        user = await User.findById(creator)
    } catch (error) {
        return res.status(500).json({ message: 'Creating place failed, please try again' })
    }

    if (!user) {
        return res.status(404).json({ message: 'Could not find user for provided id' })
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace)
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (error) {
        return res.status(500).json({ message: "Could not create place, Try again later" })
    }

    res.status(201).json({ places: createdPlace.toObject({ getters: true}) })
}  


//UPDATE PLACE--------------modal.save()--------------------
const updatePlace = async (req, res, next) => {
    const placeId = req.params.pid
    const {title, description} = req.body

    let place
    
    try {
        place = await Place.findById(placeId)
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong! Could not find place'})
    }

    place.title = title
    place.description = description

    try {
        await place.save()
    } catch (error) {
        return res.status(500).json({ message: 'Could not update place, Try again later'})        
    }

    res.status(200).json({ place: place.toObject({ getters: true })}) 
}


//DELETE PLACE ----------------modal.deleteOne()-----------------
const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid

    let place

    try {
        place = await Place.findById(placeId).populate('creator')
    } catch (error) {
        return res.status(500).json({ message: 'Somthing went wrong, could not find place with that id'})
    }

    if (!place) {
        return res.status(404).json({ message: 'Could not find place for that id' })
    }
    
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await place.deleteOne({ session: sess })
        place.creator.places.pull(place)
        await place.creator.save({ session: sess })
        await sess.commitTransaction()
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong could not delete place!'})
    }

    res.status(200).json({ message: 'Deleted Place Successfully'})
}

exports.getPlacesById = getPlacesById
exports.getPlacesByUserId = getPlacesByUserId
exports.createdPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace