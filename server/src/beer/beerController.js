const Beer = require("./beerModel");

//Function to create new beer in DB
exports.newBeers = async(req, res) => {
    try {
        let beer = new Beer({
            _id: req.body.id,
            name: req.body.name, 
            type: req.body.type,
            taste: req.body.taste == null ? "There's no taste information about this beer. Why not add your own?" : req.body.taste,
            price: req.body.price,
            link: req.body.link,
            release: req.body.release
        })
        let createdBeer = await beer.save();
        res.status(200).json({
            msg: "New beer added",
            data: createdBeer
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

//Function to get all beers in DB
exports.getBeers = async(req, res) => {
    try {
        Beer.find({}, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

//Function to get only beers which does NOT have release null in DB
exports.getReleases = async(req, res) => {
    try {
        Beer.find({release: {$ne: null}}, function(err, result){
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

//Function to find specific beer based on beer id
exports.getBeerInfo = async(req, res) => {
    try {
        Beer.find({'_id': req.params._id}, function(err, result){
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