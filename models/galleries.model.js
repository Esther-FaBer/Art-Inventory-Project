const db = require("../db/connection");


// fetch all galleries
exports.fetchGalleries = async () => {

    const { rows: galleries } = await db.query(
        `SELECT gallery_id, gallery_name, address, city,
         country, contact_email, phone_number
        FROM galleries
        ORDER BY gallery_name ASC`
        );
    
    return galleries;
};

// fetch gallery by Id
exports.fetchGalleryById = async (galleryId) => {
    const { rows: galleries } = await db.query(
        `SELECT gallery_id, gallery_name, address, city, 
                country, contact_email, phone_number, 
                website, description
         FROM galleries
         WHERE gallery_id = $1`,
        [galleryId]
    );

    return galleries[0];
};