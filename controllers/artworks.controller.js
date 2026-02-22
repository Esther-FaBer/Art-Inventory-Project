const { fetchArtworks, fetchArtworkById, createArtwork, updateArtwork, updateArtworkById } =  require("../models/artworks.model");

// GET /api/artworks
exports.getArtworks = async (req, res, next) => {

    try{
        const artworks = await fetchArtworks();
    
        if(!artworks || !artworks.length) {
            return res.status(200).send({artworks: [] });
        }
            return res.status(200).send({ artworks });

    } catch (error) {
        next(error);
    }
};


// GET /api/artworks/:id
exports.getArtworkById = async (req, res, next) => {

    try{

        const { id } = req.params;
        const artwork = await fetchArtworkById(id);
        
        if (!artwork) {
            const error = new Error('Artwork not found');
            error.statusCode = 404;
            throw error;
        }
    
        return res.status(200).send({ artwork });
    
    } catch (error) {
        next(error);
    }
};

// POST /api/artworks
exports.createArtwork = async (req, res, next) => {

    try{
        const { title, artist_id } = req.body;
        
        if (!title || !artist_id) {
            throw new AppError('Title and artist_id are required', 400);
        }
        
        const artwork = await createArtwork(req.body);
        return res.status(201).send({ artwork });
    
    } catch(error) {
        next(error);
    }
};

// PUT /api/artworks/:id
exports.updateArtwork = async (req, res, next) => {
    try {
        const { id } = req.params;
        const artwork = await updateArtworkById(id, req.body);

        if (!artwork) {
            const error = new Error('Artwork not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).send({
            message: 'Artwork updated successfully',
            artwork
        });

    } catch (error) {
        next(error);
    }
};
