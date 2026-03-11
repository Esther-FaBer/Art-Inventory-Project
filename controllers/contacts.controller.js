const { 
    fetchContacts, 
    fetchContactById,
    createContact,
    updateContact: updateContactInDb,
    deleteContact: deleteContactFromDb,
    } =  require("../models/contacts.model");


// get all contacts - GET /api/contacts
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await fetchContacts();

        if (!contacts.length) {
            return res.status(200).send({ contacts: [] });
            }


        return res.status(200).send({ contacts });
    
    } catch (error) {
        next(error);
    }
};

// get contact by Id - GET /api/contacts/:id
exports.getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contact = await fetchContactById(id);

        if (!contact) {
            return res.status(404).send({ message: "Contact not found" });
        }

        return res.status(200).send({ contact });

    } catch (error) {
        next(error);
    }
};

//create new contact - POST /api/contacts
exports.createContact = async (req, res, next) => {
    try {
        const { contact_name, email, country_code, phone_number } = req.body;

        if (!contact_name) {
            return res.status(400).send({ message: "Contact name is required" });
        }

        if (!email && !phone_number) {
            return res.status(400).send({ message: "Either email or phone number is required" });
        }

        const contact = await createContact(req.body);

        return res.status(201).send({ 
            message: "Contact created successfully",
            contact 
        });

    } catch (error) {
        next(error);
    }
};

// Update contact - PUT /api/contacts/:id
exports.updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: 'No fields provided to update' });
        }
        
        const contact = await updateContactInDb(id, req.body);
        
        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        
        return res.status(200).send({
            message: 'Contact updated successfully',
            contact
        });
        
    } catch (error) {
        next(error);
    }
};

// delete contact - DELETE /api/contacts/:id
exports.deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const contact = await deleteContactFromDb(id);
        
        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        
        return res.status(200).send({
            message: 'Contact deleted successfully',
            contact
        });
        
    } catch (error) {
        next(error);
    }
};

//search term - GET /api/contacts/search?q=term
exports.searchContacts = async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q || !q.trim()) {
            return res.status(400).send({ message: 'Search query is required' });
        }
        
        const contacts = await searchContactsInDb(q);
        
        return res.status(200).send({
            query: q,
            count: contacts.length,
            contacts
        });
        
    } catch (error) {
        next(error);
    }
};