const express = require("express"); //Express to handle server-side
const router = express.Router(); //Router to bind posts and gets to url
const userController = require("./userController");
const auth = require("../middleware/auth");

// Post request to create a new user, login a user, update the user collection and update the profile image
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/updatebeers", userController.updateUserBeers);
router.post("/updateimg", userController.updateUserImg);
router.get("/getuser/:name", userController.getUser); //Special router that takes variable name


module.exports = router;
 
