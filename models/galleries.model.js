const db = require("../db/connection");

exports.fetchGalleries = async () =>{

    const { rows: galleries } = await db.query(
        `SELECT gallery_id, gallery_name, location, contact_email, phone-number
        `);
    
    return galleries;
};