const BeerNotes = require("./beerNotesModel");

//Function to add a new beer note in DB, connected to user id and beer id
exports.newBeerNotes = async(req, res) => {
    try {
        let beerNotes = new BeerNotes({
            userName: req.body.userName,
            beerId: req.body.beerId,
            rating: req.body.rating,
            notes: req.body.notes,
        })
        let createdNotes = await beerNotes.save();
        res.status(200).json({
            msg: "New note added",
            data: createdNotes
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

//Get beernote based on user id and beer id
exports.getBeerNotes = async(req, res) => {
    const noteId = {
        userName: req.params.userName,
        beerId: req.params.beerId
    }
    try {
        BeerNotes.find({'userName': noteId.userName, 'beerId': noteId.beerId},
        function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
}
