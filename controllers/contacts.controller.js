const { fetchContacts, 
    fetchContactById,
    createContact,
    updateContact,
    deleteContact } =  require("../models/contacts.model");


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