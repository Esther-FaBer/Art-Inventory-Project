const express = require("express");
const cors = require("cors");

//to import all routes
const artistRoutes = require("./routes/artist.routes");
const artworkRoutes = require("./routes/artwork.routes");
const galleryRoutes = require("./routes/gallery.routes");
const contactRoutes = require("./routes/contact.routes");
const roleRoutes = require("./routes/role.routes");
const { 
    getArtists,
    getArtistById, 
    createArtist, 
    updateArtist, 
    deleteArtist,
    searchArtists,
    getArtistArtworks
} = require("./controllers/artists.controllers");

const { 
    getArtworks, 
    getArtworkById, 
    createArtwork, 
    updateArtwork, 
    deleteArtwork,
    searchArtworks
} = require("./controllers/artworks.controller");

const { 
    getGalleries, 
    getGalleryById, 
    createGallery, 
    updateGallery, 
    deleteGallery,
    searchGalleries
} = require("./controllers/galleries.controller");

const { 
    getContacts, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact,
    searchContacts
} = require("./controllers/contacts.controller");

const { 
    getRoles, 
    getRoleById, 
    createRole, 
    updateRole, 
    deleteRole
} = require("./controllers/roles.controller");


// Import error handlers


const app = express();


//middleware
app.use(cors());
app.use(express.json());



//create routes
// artist routes
app.get("/api/artists/search", searchArtists);
app.get("/api/artists", getArtists);
app.get("/api/artists/:id", getArtistById);
app.post("/api/artists", createArtist);
app.put("/api/artists/:id", updateArtist);
app.delete("/api/artists/:id", deleteArtist);
app.get("/api/artists/:id/artworks", getArtistArtworks);

//artwork routes
app.get("/api/artworks/search", searchArtworks);
app.get("/api/artworks", getArtworks);
app.get("/api/artworks/:id", getArtworkById);
app.post("/api/artworks", createArtwork);
app.put("/api/artworks/:id", updateArtwork);
app.delete("/api/artworks/:id", deleteArtwork);

//gallery routes
app.get("/api/galleries/search", searchGalleries);
app.get("/api/galleries", getGalleries);
app.get("/api/galleries/:id", getGalleryById);
app.post("/api/galleries", createGallery);
app.put("/api/galleries/:id", updateGallery);
app.delete("/api/galleries/:id", deleteGallery);

//contact routes
app.get("/api/contacts/search", searchContacts);
app.get("/api/contacts", getContacts);
app.get("/api/contacts/:id", getContactById);
app.post("/api/contacts", createContact);
app.put("/api/contacts/:id", updateContact);
app.delete("/api/contacts/:id", deleteContact);


//role routes
app.get("/api/roles", getRoles);
app.get("/api/roles/:id", getRoleById);
app.post("/api/roles", createRole);
app.put("/api/roles/:id", updateRole);
app.delete("/api/roles/:id", deleteRole);


// api/health endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Art Inventory API is running"
    });
});

//error handlers
app.all("*", handlePathNotFound);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;
