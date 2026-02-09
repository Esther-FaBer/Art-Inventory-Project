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
