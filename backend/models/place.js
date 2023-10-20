const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlaceSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {
        lat: {type: Number},
        lng: {type: Number}
    },
    image: {type: String, required: true},
    address: {type: String, required: true},
    creator:  {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Place', PlaceSchema)