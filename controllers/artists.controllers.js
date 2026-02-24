const { fetchArtists, fetchArtistById, insertArtist, updateArtistById, deleteArtist  } =  require("../models/artists.models");

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

// PUT /api/artists/:id
exports.updateArtist = async (req, res, next) => {
    try {
        const artist = await updateArtistById(id, req.body);

        if (!artist) {
            const error = new Error('Artist not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).send({
            message: 'Artist updated successfully',
            artist
        });

    } catch (error) {
        next(error);
    }
};

// DELETE /api/artists/:id
exports.deleteArtist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const artist = await deleteArtist(id);

        if (!artist) {
            const error = new Error('Artist not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).send({
            message: 'Artist deleted successfully',
            artist
        });

    } catch (error) {
        next(error);
    }
};
