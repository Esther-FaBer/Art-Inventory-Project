const express = require("express");
const cors = require("cors");

//to import all routes
const artistRoutes = require("./routes/artist.routes");



//to create Express app
const app = express();

app.use(express.json());



module.exports = app;
