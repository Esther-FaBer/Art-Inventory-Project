const express = require("express");
const cors = require("cors");

// Import all routes
console.log("Loading artist routes...");
const artistRoutes = require("./routes/artist.routes");
console.log("Artist routes loaded");

console.log("Loading artwork routes...");
const artworkRoutes = require("./routes/artwork.routes");
console.log("Artwork routes loaded");

console.log("Loading gallery routes...");
const galleryRoutes = require("./routes/gallery.routes");
console.log("Gallery routes loaded");

console.log("Loading contact routes...");
const contactRoutes = require("./routes/contact.routes");
console.log("Contact routes loaded");

console.log("Loading roles routes...");
const roleRoutes = require("./routes/roles.routes.js");
console.log("Roles routes loaded");


// Import error handlers
const { 
    handlePathNotFound, 
    handleCustomErrors,
    handleServerErrors 
} = require("./errors.js");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/artists", artistRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/galleries", galleryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/roles", roleRoutes);

// api/health endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Art Inventory API is running"
    });
});

// Error handlers
app.all("*", handlePathNotFound);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;
