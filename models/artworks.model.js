const db = require("../db/connection");

// get all artworks
exports.fetchArtworks = async () => {

        const {rows: artworks } = await db.query(
            `SELECT 
            aw.artwork_id, 
            aw.artist_id, 
            ar.artist_name,
            aw.title, 
            aw.year_created, 
            aw.artwork_type, 
            aw.medium, 
            aw.description, 
            aw.price, 
            aw.status, 
            aw.vat_status, 
            aw.edition
            FFROM artworks aw
            LEFT JOIN artists ar ON aw.artist_id = ar.artist_id
            ORDER BY aw.artwork_id DESC`
        );    
        return artworks;
};

// get artwork by ID
exports.fetchArtworkById = async (artworkId) => {

        const { rows: artworks } = await db.query(
            `SELECT 
            aw.artwork_id, 
            aw.artist_id,
            ar.artist_name,
            aw.title, 
            aw.year_created, 
            aw.artwork_type, 
            aw.medium, 
            aw.description, 
            aw.price, 
            aw.status, 
            aw.vat_status, 
            aw.edition
            FROM artworks aw
            LEFT JOIN artists ar ON aw.artist_id = ar.artist_id
            WHERE aw.artwork_id = $1`,
            [artworkId]
        );
        return artworks[0]; 

};

//create a new artwork
exports.createArtwork = async (artworkData) => {
    const { 
        artist_id, title, year_created, artwork_type, 
        medium, description, price, status, vat_status, edition 
    } = artworkData;

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

};

// update pre-existing artwork
exports.updateArtwork = async (artworkId, artworkData) => {
    const { 
        artist_id, title, year_created, artwork_type, 
        medium, description, price, status, vat_status, edition 
    } = artworkData;
    

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

};

// delete artwork
exports.deleteArtwork = async (artworkId) => {

        const { rows: artworks } = await db.query(
            `DELETE FROM artworks 
             WHERE artwork_id = $1 
             RETURNING *`,
            [artworkId]
        );
        return artworks[0];

};

// get artworks by artist
exports.fetchArtworksByArtist = async (artistId) => {

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

};

// search artworks
exports.searchArtworks = async (searchTerm) => {

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

};