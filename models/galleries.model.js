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


// create new gallery
exports.insertGallery = async (galleryData) => {
    const { 
        gallery_name, 
        address, 
        city, 
        country, 
        contact_email,   
        phone_number,    
        website, 
        description 
    } = galleryData;

    const { rows: galleries } = await db.query(
        `INSERT INTO galleries 
            (gallery_name, address, city, country, 
             contact_email, phone_number, website, description)
         VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [gallery_name, address, city, country, 
         contact_email, phone_number, website, description]
    );

    return galleries[0];
};

//update gallery

exports.updateGallery = async(galleryId, galleryData) => {
    const {
        gallery_name, 
        address, 
        city, 
        country, 
        contact_email,   
        phone_number,    
        website, 
        description
    } = galleryData;

    const { rows: galleries } = await db.query(
        `UPDATE galleries
         SET gallery_name  = $1,
             address       = $2,
             city          = $3,
             country       = $4,
             contact_email = $5,
             phone_number  = $6,
             website       = $7,
             description   = $8,
             updated_at    = CURRENT_TIMESTAMP
         WHERE gallery_id  = $9
         RETURNING *`,
        [gallery_name, address, city, country, 
         contact_email, phone_number, website, description, galleryId]
    );

    return galleries[0];
    
};
