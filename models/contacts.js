const db = require("../db/connection");

exports.fetchContacts = async () => {
    const { rows: contacts} = await db.query(
        `SELECT contact_id, contact_type, contact_name,
        email, phone_number, notes`);
    
    return contacts;

};