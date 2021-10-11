const express = require("express");
const PORT = process.env.PORT || 4000; //Setting default port
const morgan = require("morgan"); //Used to log requests in terminal window.
const cors = require("cors"); //Middleware, enabling CORS (Cross-Origin Resource Sharing)
const bodyParser = require("body-parser"); //Enables express to read req body and parse it into JSON that can be understood.
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Initializing server
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) =>{
    console.log("It lives");
});

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

require("./config/db")(app);

//Create a route prefix for user and beer
const userRoutes = require("./account/userRoute");
app.use("/user", userRoutes);

const beerRoutes = require("./beer/beerRoutes");
app.use("/beer", beerRoutes);
