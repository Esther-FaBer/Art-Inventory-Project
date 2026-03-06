const express = require('express');
const router = express.Router();

const {
    getArtworks,
    getArtworkById,
    createArtwork,
    updateArtwork,
    deleteArtwork,
    searchArtworks
} = require('../controllers/artworks.controller');


// CRUD
router.get('/', getArtworks);
router.get('/:id', getArtworkById);
router.post('/', createArtwork);
router.put('/:id', updateArtwork);
router.patch('/:id', updateArtwork);
router.delete('/:id', deleteArtwork);
router.get('/search', searchArtworks);

module.exports = router;