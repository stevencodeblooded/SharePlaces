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
        return res.status(404).json({message: 'Could not find any place for the specified user id'})
    }

    res.json({ places: places.map(p => p.toObject({ getters: true }))}).status(200)
}


//CREATE PLACE---------------------modale.save()-------------------
const createPlace = async (req, res, next) => {
    const {title, description, address, creator} = req.body
    const image = req.file.filename

    const createdPlace = new Place({
        title,
        description,
        address,
        creator,
        image
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

    let sess
    try {
        sess = await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace)
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (error) {
        await sess.abortTransaction();
        return res.status(500).json({ message: "Could not create place, Try again later" })
    }

    res.status(201).json({ places: createdPlace.toObject({ getters: true}), message: 'Created Place Successfully'})
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