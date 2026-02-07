const { fetchContacts } =  require("../models/contacts.model");

exports.getContacts = async (req, res, next) => {

    const contacts = await fetchContacts();

    if (!contacts.length) {
        return res.status(200).send({ contacts: [] });
        }


        return res.status(200).send({ contacts });
};