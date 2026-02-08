const db = require("../db/connection");


// get all artworks
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

// get artwork by ID
exports.fetchArtworkById = async (artworkId) => {
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

// update pre-existing artwork
exports.updateArtwork = async (artworkId, artworkData) => {
    const { 
        artist_id, title, year_created, artwork_type, 
        medium, description, price, status, vat_status, edition 
    } = artworkData;
    
    try {
        const { rows: artworks } = await db.query(
            `UPDATE artworks
             SET artist_id = $1, 
                 title = $2, 
                 year_created = $3, 
                 artwork_type = $4, 
                 medium = $5, 
                 description = $6, 
                 price = $7, 
                 status = $8, 
                 vat_status = $9, 
                 edition = $10
             WHERE artwork_id = $11
             RETURNING *`,
            [artist_id, title, year_created, artwork_type, 
             medium, description, price, status, vat_status, edition, artworkId]
        );
        return artworks[0];
    } catch (error) {
        console.error('Error updating artwork:', error);
        throw error;
    }
};

// delete artwork
exports.deleteArtwork = async (artworkId) => {
    try {
        const { rows: artworks } = await db.query(
            `DELETE FROM artworks 
             WHERE artwork_id = $1 
             RETURNING *`,
            [artworkId]
        );
        return artworks[0];
    } catch (error) {
        console.error('Error deleting artwork:', error);
        throw error;
    }
};

// get artworks by artist
exports.fetchArtworksByArtist = async (artistId) => {
    try {
        const { rows: artworks } = await db.query(
            `SELECT 
                artwork_id, artist_id, title, year_created, 
                artwork_type, medium, description, price, 
                status, vat_status, edition
             FROM artworks
             WHERE artist_id = $1
             ORDER BY year_created DESC`,
            [artistId]
        );
        return artworks;
    } catch (error) {
        console.error('Error fetching artworks by artist:', error);
        throw error;
    }
};

// get artworks by artist
exports.fetchArtworksByArtist = async (artistId) => {
    try {
        const { rows: artworks } = await db.query(
            `SELECT 
                artwork_id, artist_id, title, year_created, 
                artwork_type, medium, description, price, 
                status, vat_status, edition
             FROM artworks
             WHERE artist_id = $1
             ORDER BY year_created DESC`,
            [artistId]
        );
        return artworks;
    } catch (error) {
        console.error('Error fetching artworks by artist:', error);
        throw error;
    }
};

// search artworks
exports.searchArtworks = async (searchTerm) => {
    try {
        const { rows: artworks } = await db.query(
            `SELECT artwork_id, artist_id, title, year_created, artwork_type, 
                medium, description, price, status, vat_status, edition, artist_name
             FROM artworks a
             LEFT JOIN artists ar ON a.artist_id = ar.artist_id
             WHERE a.title ILIKE $1 
                OR a.description ILIKE $1 
                OR ar.artist_name ILIKE $1
             ORDER BY a.artwork_id DESC`,
            [`%${searchTerm}%`]
        );
        return artworks;
    } catch (error) {
        console.error('Error searching artworks:', error);
        throw error;
    }
};