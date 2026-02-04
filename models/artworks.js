const db = require("../db/connection");

exports.fetchArtworks = async () => {
   `SELECT artwork_id, artist_id, title, year_created, 
        artwork_type, medium, description, price, 
        status, vat_status, edition
    FROM artworks
    ORDER BY artwork_id DESC`
    
    return artworks;

};