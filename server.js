const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
    .connect("mongodb://localhost/db", { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((e) => {
        console.log("Error while DB connecting");
        console.log(e);
    });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const router = express.Router();
app.use("/phonebook", router);
require(__dirname + "/controllers/phonebookController")(router);

const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));