const { fetchGalleries} =  require("../models/galleries");

exports.getgalleries = async (req, res, next) => {

    const galleries = await fetchGalleries();

    if(!galleries.length) {
        return res.status(200).send({galleries: [] });
    }

    return res.status(200).send ({ galleries });
}