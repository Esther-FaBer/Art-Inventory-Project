const db = require("../db/connection");

exports.fetchArtists = async () => {
    const { rows: artists } = await db.query(
        `SELECT artist_id, artist_name, birth_year, death_year, 
        nationality, biography`);
    
    return artists;

};
