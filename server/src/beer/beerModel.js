const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
//Create a Schema for every attribute that needs to be stored in the database for a beer
const beerSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    taste: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: 'https://cdn.systembolaget.se/492c4d/contentassets/ef797556881d4e20b334529d96b975a2/placeholder-wine-bottle.png'
    },
    release: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});
//Class export, return error if beer is not unique and already exist 
module.exports = mongoose.model("Beer", beerSchema);
beerSchema.plugin(uniqueValidator, {
    message: '{PATH} already in use'
});