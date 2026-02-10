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

// fetch single contact by Id
exports.fetchContactById = async (contactId) => {
    try {
        const { rows: contacts } = await db.query(
            `SELECT contact_id, contact_type, contact_name,
                    email, phone_number, notes
             FROM contacts
             WHERE contact_id = $1`,
            [contactId]
        );
        return contacts[0]; // return first result or undefined
    } catch (error) {
        console.error('Error fetching contact:', error);
        throw error;
    }
};


//create a new contact
exports.createContact = async (contactData) => {
    const { contact_type, contact_name, email, phone_number, notes } = contactData;
    
    try {
        const { rows: contacts } = await db.query(
            `INSERT INTO contacts (contact_type, contact_name, email, phone_number, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [contact_type, contact_name, email, phone_number, notes]
        );
        return contacts[0];
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

// delete contact
exports.deleteContact = async (contactId) => {
    const { rows: contacts } = await db.query(
        `DELETE FROM contacts
         WHERE contact_id = $1
         RETURNING *`,
        [contactId]
    );
    
    return contacts[0];
};