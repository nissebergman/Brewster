const mongoose = require("mongoose"); //Mongoose for handling calls to MongoDB 
var uniqueValidator = require("mongoose-unique-validator"); //Plugin for better error-handling for fields from mongoose schema
const bcrypt = require("bcrypt"); //Used for hashing pw
const jwt =  require("jsonwebtoken"); //Token received when login.
const Schema = mongoose.Schema;
//Create a Schema for every attribute that needs to be stored in the database of a user
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileIMG: {
        type: String,
        require: true
    },
    addedBeers: {
        type: Array
    },
}, {
    timestamps: true,
});

//Method for hashing password, 10 seeds.
userSchema.methods.hashPassword = async(password) => {
    return await bcrypt.hashSync(password, 10);
}
//Method to check if the right password was input
userSchema.methods.compareUserPassword = async(inputedPassword, hashedPassword) => {
    return await bcrypt.compare(inputedPassword, hashedPassword);
}
//Generate token upon successful login
userSchema.methods.generateJwtToken = async(payload, secret, expires) => {
    return jwt.sign(payload, secret, expires);
}
//Class export, return error if username not unique
module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});