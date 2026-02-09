const { fetchArtists } =  require("../models/artists.models");

exports.getArtists = async (req, res, next) => {

    const artists = await fetchArtists();

    if (!artists.length) {
        return res.status(200).send({ artists: [] });
        }


        return res.status(200).send({ artists });
};




