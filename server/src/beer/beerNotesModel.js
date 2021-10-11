const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

//Mongoose schema for adding beer notes to DB
const beerNotesSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    beerId: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }
})
//Class export, return error if a beer is already in the collection of a user
module.exports = mongoose.model("BeerNotes", beerNotesSchema);
beerNotesSchema.plugin(uniqueValidator, {
    message: '{PATH} already in use'
});