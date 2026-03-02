const express = require('express');
const router = express.Router();
const { getArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
    searchArtists,
    getArtistArtworks } = require("../controllers/artists.controllers");

router.get('/search', searchArtists);

router.get('/', getArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.patch('/:id', updateArtist);
router.delete('/:id', deleteArtist);

router.get('/:id/artworks', getArtistArtworks);

module.exports = router;