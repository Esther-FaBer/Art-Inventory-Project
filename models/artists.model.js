const db = require("../db/connection");


// fetch all artist 
exports.fetchArtists = async () => {
    const { rows: artists } = await db.query(
        `SELECT artist_id, artist_name, birth_year, death_year, 
        nationality, biography
        FROM artists
        ORDER BY artist_name ASC`);
    
    return artists;
};

// fetch artist by ID
exports.fetchArtistById = async (artistId) => {
    const { rows: artists } = await db.query(
        `SELECT artist_id, artist_name, birth_year, death_year, 
                nationality, biography
         FROM artists
         WHERE artist_id = $1`,
        [artistId]
    );
    
    return artists[0]; // Returns undefined if not found
};
