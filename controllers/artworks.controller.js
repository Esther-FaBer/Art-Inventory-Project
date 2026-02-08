const { fetchArtworks, fetchArtworkById, createArtwork } =  require("../models/artworks.model");

exports.getArtworks = async (req, res, next) => {

        const artworks = await fetchArtworks();
    
        if(!artworks || !artworks.length) {
            return res.status(200).send({artworks: [] });
        }
            return res.status(200).send({ artworks });
};

exports.getArtworkById = async (req, res, next) => {

    const { id } = req.params;
    const artwork = await fetchArtworkById(id);
    
    if (!artwork) {
        const error = new Error('Artwork not found');
        error.statusCode = 404;
        throw error;
    }
    
    return res.status(200).send({ artwork });
};

exports.createArtwork = async (req, res, next) => {
    const { title, artist_id } = req.body;
    
    if (!title || !artist_id) {
        throw new AppError('Title and artist_id are required', 400);
    }
    
    const artwork = await createArtwork(req.body);
    return res.status(201).send({ artwork });
};