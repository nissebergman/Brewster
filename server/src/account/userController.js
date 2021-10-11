const mongooseUniqueValidator = require("mongoose-unique-validator"); //Plugin for better error-handling for fields from mongoose schema
const User = require("./userModel");

// Function to register new user to DB
exports.registerNewUser = async(req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            profileIMG: "https://brewster-profile-img.s3.eu-north-1.amazonaws.com/profile.png", //Default profile img on our amazon bucket
            addedBeers: []
        })
        
        user.password = await user.hashPassword(req.body.password); //Using hash function from user model to obfuscate pw
        let createdUser = await user.save(); //Write changes to DB, catch return status from server
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
// Function to login user to DB
exports.loginUser = async (req, res) => {
    const login = {
        name: req.body.name,
        password: req.body.password
    }
    try {
        let user = await User.findOne({
            name: login.name
        });
        
        if(!user){
            res.status(400).json({
                type: "Not found",
                msg: "Wrong login details"
            })
        }
        
        //Check PW
        let match = await user.compareUserPassword(login.password, user.password);
        if(match){
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })
            if(token){
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        }
        else {
            res.status(400).json({
                type: "Not found",
                msg: "Wrong login details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

//Fetch user when req name
exports.getUser = async(req, res) =>{
    try {     
        User.find({name: req.params.name}, function(err,result){
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

//Pushing added beers to user array of added beers
exports.updateUserBeers = async(req, res) => {
    const userName = {name: req.body.userName};
        const beerId = req.body.beerId;
        const change = {$push: {addedBeers: beerId}};
    try{
        let user = User.findOneAndUpdate(userName, change, (error) => {
            if(error){
                console.log("Couldn't update");
            }
        });
        res.status(200).json({
            msg: "Updated user",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}

//Update user IMG
exports.updateUserImg = async(req, res) => {
    const userName = {name: req.body.userName};
    const profileIMG = req.body.profileIMG;
    const change = {profileIMG: req.body.profileIMG};
    try{
        let user = await User.findOneAndUpdate(userName, change, (error) => {
            if(error){
                console.log("Couldn't update");
            }
        });
        res.status(200).json({
            msg: "Updated user",
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}