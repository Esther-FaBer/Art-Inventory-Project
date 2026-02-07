const { fetchGalleries} =  require("../models/galleries.model");

exports.getGalleries = async (req, res, next) => {

    const galleries = await fetchGalleries();

    if(!galleries.length) {
        return res.status(200).send({galleries: [] });
    }

    return res.status(200).send({ galleries });
}