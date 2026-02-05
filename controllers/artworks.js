const { fetchArtworks} =  require("../models/artworks");

exports.getArtworks = async (req, res, next) => {
    try {
        const artworks = await fetchArtworks();
    
        if(!artworks || !artworks.length) {
            return res.status(200).send({artworks: [] });
        }

            return res.status(200).send({ artworks });

    } catch (error) {
        next(error); // pass the error to the errors file
}
}