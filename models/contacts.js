const db = require("../db/connection");

exports.fetchContacts = async () => {
    const { rows: contacts} = await db.query(
        `SELECT contact_id, contact_type, contact_name,
            email, phone_number, notes
        FROM contacts
        ORDER BY contact_name ASC`);
    
    return contacts;

};