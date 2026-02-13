const { fetchGalleries, fetchGalleryById, insertGallery } =  require("../models/galleries.model");

exports.getGalleries = async (req, res, next) => {

    const galleries = await fetchGalleries();

    if(!galleries.length) {
        return res.status(200).send({galleries: [] });
    }

    return res.status(200).send({ galleries });
};

exports.getGalleryById = async (req, res, next) => {

        const { id } = req.params;

        const gallery = await fetchGalleryById(id);

        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }

        return res.status(200).send({ gallery });
};

exports.createGallery = async (req, res, next) => {

        const { gallery_name, contact_email } = req.body;

        if (!gallery_name) {
            return res.status(400).send({ message: "Gallery name is required" });
        }

        if (contact_email && !isValidEmail(contact_email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        const gallery = await insertGallery(req.body);

        return res.status(201).send({
            message: "Gallery created successfully",
            gallery
        });
    };