const express = require('express');
const router = express.Router();

const {
    getGalleries,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
    //searchGalleries
} = require('../controllers/galleries.controller');

//router.get('/search', searchGalleries);

router.get('/', getGalleries);
router.get('/:id', getGalleryById);
router.post('/', createGallery);
router.put('/:id', updateGallery);
router.patch('/:id', updateGallery);
router.delete('/:id', deleteGallery);

module.exports = router;