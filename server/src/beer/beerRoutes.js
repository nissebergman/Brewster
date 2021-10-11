const express = require("express");
const router = express.Router();
const beerController = require("./beerController");
const beerNotesController = require("./beerNotesController");

//Beer posts
router.post("/updatebeers", beerController.newBeers);
router.post("/updatebeernotes", beerNotesController.newBeerNotes);

//Beer gets
router.get("/getbeers", beerController.getBeers);
router.get("/getreleases", beerController.getReleases);
router.get("/getbeers/:_id", beerController.getBeerInfo);
router.get("/getbeernotes/:userName/:beerId", beerNotesController.getBeerNotes);


module.exports = router;