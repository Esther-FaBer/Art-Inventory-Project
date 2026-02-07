const db = require("../db/connection");

exports.fetchContacts = async () => {

    try{

        const { rows: contacts } = await db.query(
            `SELECT contact_id, contact_type, contact_name,
                email, phone_number, notes
            FROM contacts
            ORDER BY contact_name ASC`);
    
        return contacts;

        } catch(error) {
            console.log("Error fetching contacts", error);
            throw error;
        }
};