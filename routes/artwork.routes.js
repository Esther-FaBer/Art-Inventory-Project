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

// search route
router.get('/search', searchArtworks);

// CRUD
router.get('/', getArtworks);
router.get('/:id', getArtworkById);
router.post('/', createArtwork);
router.put('/:id', updateArtwork);
router.patch('/:id', updateArtwork);
router.delete('/:id', deleteArtwork);

module.exports = router;