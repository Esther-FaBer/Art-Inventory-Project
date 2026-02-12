const db = require("../db/connection");

// fetch all contacts
exports.fetchContacts = async () => {
        const { rows: contacts } = await db.query(
            `SELECT contact_id, contact_type, contact_name,
                email, phone_number, notes
            FROM contacts
            ORDER BY contact_name ASC`);
    
        return contacts;
        };


// fetch single contact by Id
exports.fetchContactById = async (contactId) => {
        const { rows: contacts } = await db.query(
            `SELECT contact_id, contact_type, contact_name,
                    email, phone_number, notes
             FROM contacts
             WHERE contact_id = $1`,
            [contactId]
        );
        return contacts[0];
    };


//create a new contact
exports.createContact = async (contactData) => {
    const { contact_type, contact_name, email, phone_number, notes } = contactData;
    
        const { rows: contacts } = await db.query(
            `INSERT INTO contacts (contact_type, contact_name, email, phone_number, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [contact_type, contact_name, email, phone_number, notes]
        );
        return contacts[0];
    };
 
// update contact
exports.updateContact = async (contactId, contactData) => {
    const { 
        contact_type, contact_name, email, phone_number, 
        address, city, country, notes 
    } = contactData;
    
    const { rows: contacts } = await db.query(
        `UPDATE contacts
         SET contact_type = $1,
             contact_name = $2,
             email = $3,
             phone_number = $4,
             address = $5,
             city = $6,
             country = $7,
             notes = $8
         WHERE contact_id = $9
         RETURNING *`,
        [contact_type, contact_name, email, phone_number, address, city, country, notes, contactId]
    );
    
    return contacts[0];
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

// fetch contacts by type
exports.fetchContactsByType = async (contactType) => {
    const { rows: contacts } = await db.query(
        `SELECT contact_id, contact_type, contact_name, email, 
                country_code, phone_number, address, city, country, notes
         FROM contacts
         WHERE contact_type = $1
         ORDER BY contact_name ASC`,
        [contactType]
    );
    
    return contacts;
};

// fetch contacts by city
exports.fetchContactsByCity = async (city) => {
    const { rows: contacts } = await db.query(
        `SELECT contact_id, contact_type, contact_name, email, 
                country_code, phone_number, address, city, country, notes
         FROM contacts
         WHERE city ILIKE $1
         ORDER BY contact_name ASC`,
        [city]
    );
    
    return contacts;
};