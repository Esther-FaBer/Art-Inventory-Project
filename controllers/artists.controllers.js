const { fetchArtists, fetchArtistById, insertArtist  } =  require("../models/artists.models");

// GET /api/artists
exports.getArtists = async (req, res, next) => {
    try {
        const artists = await fetchArtists();

        if (!artists || !artists.length) {
            return res.status(200).send({ artists: [] });
        }

        return res.status(200).send({ artists });

    } catch (error) {
        next(error);
    }
};

// GET /api/artists/:id
exports.getArtistById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const artist = await fetchArtistById(id);

        if (!artist) {
            const error = new Error('Artist not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).send({ artist });

    } catch (error) {
        next(error);
    }
};

// POST /api/artists
exports.createArtist = async (req, res, next) => {
    try {
        const artist = await insertArtist(req.body);

        return res.status(201).send({
            message: 'Artist created successfully',
            artist
        });

    } catch (error) {
        next(error);
    }
};


