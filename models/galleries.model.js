const db = require("../db/connection");


// fetch all galleries
exports.fetchGalleries = async () => {

    const { rows: galleries } = await db.query(
        `SELECT gallery_id, gallery_name, address, contact_email, phone_number
        FROM galleries
        ORDER BY gallery_name ASC
        `);
    
    return galleries;
};