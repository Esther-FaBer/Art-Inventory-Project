const express = require("express");
const cors = require("cors");

//to import all routes
const artistRoutes = require("./routes/artist.routes");
const artworkRoutes = require("./routes/artworkRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const roleRoutes = require("./routes/roleRoutes");

// Import error handlers


//to create Express app
const app = express();


//middleware
app.use(cors());
app.use(express.json());



//create routes

// api/health endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Art Inventory API is running"
    });
});

module.exports = app;
