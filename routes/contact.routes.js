const express = require('express');
const router = express.Router();

const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    searchContacts
} = require('../controllers/contacts.controller');


router.get('/search', searchContacts);

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;