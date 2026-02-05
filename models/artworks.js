const db = require("../db/connection");


//get all artworks
exports.fetchArtworks = async () => {
    try {
        const {rows: artworks } = await db.query(
            `SELECT artwork_id, artist_id, title, year_created, 
                artwork_type, medium, description, price, 
                status, vat_status, edition
            FROM artworks
            ORDER BY artwork_id DESC`
        );    
        return artworks;

    } catch (error) {
        console.error("error fetchin artworks:",  error);
        throw error;
    }
};

//get artwork by ID
exports.fetchArtworkbyID = async (artworkId) => {
    try {
        const { rows: artworks } = await db.query(
            `SELECT artwork_id, artist_id, title, year_created, 
                artwork_type, medium, description, price, 
                status, vat_status, edition, artist_name
            FROM artworks
            WHERE artwork_id = $1`,
            [artworkId]
        );
        return artworks[0]; 

    } catch (error) {
        console.log('Error fetching artwork', error);
        throw error;
    }
};

//create a new artwork
exports.createArtwork = async (artworkData) => {
    const { 
        artist_id, title, year_created, artwork_type, 
        medium, description, price, status, vat_status, edition 
    } = artworkData;

    try {
        const { rows: artworks } = await db.query(
            `INSERT INTO artworks (
                artist_id, title, year_created, artwork_type, 
                medium, description, price, status, vat_status, edition
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [artist_id, title, year_created, artwork_type, 
             medium, description, price, status, vat_status, edition]
        );
        return artworks[0];

    } catch (error) {
        console.error('Error creating artwork:', error);
        throw error;
    }
};

