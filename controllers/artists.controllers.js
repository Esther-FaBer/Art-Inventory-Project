const { fetchArtists, fetchArtistById, insertArtist, updateArtistById, deleteArtist, searchArtists, fetchArtistArtworks  } =  require("../models/artists.models");

// GET /api/artists - get all artist
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

// GET /api/artists/:id - get artistby Id
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

// POST /api/artists -create new artist
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

// PUT /api/artists/:id -update existing artist
exports.updateArtist = async (req, res, next) => {
    try {
        const { id } = req.params; 
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

// DELETE /api/artists/:id -delete artist
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

// GET /api/artists/:id/artworks  -get artist's artworks
exports.getArtistArtworks = async (req, res, next) => {
    try {
        const { id } = req.params;

        const artist = await fetchArtistById(id);

        if (!artist) {
            const error = new Error('Artist not found');
            error.statusCode = 404;
            throw error;
        }

        const artworks = await fetchArtistArtworks(id);

        return res.status(200).send({
            artist: {
                artist_id: artist.artist_id,
                artist_name: artist.artist_name
            },
            count: artworks.length,
            artworks
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/artists/search?q=picasso - search artist
exports.searchArtists = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            const error = new Error('Search query is required');
            error.statusCode = 400;
            throw error;
        }

        const artists = await searchArtists(q);

        return res.status(200).send({
            query: q,
            count: artists.length,
            artists
        });
    } catch (error) {
        next(error);
    }
};