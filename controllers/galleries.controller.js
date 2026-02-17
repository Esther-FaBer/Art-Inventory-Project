const { fetchGalleries, fetchGalleryById, insertGallery, updateGallery, deleteGallery, fetchGalleryExhibitions } =  require("../models/galleries.model");

// GET /api/galleries
exports.getGalleries = async (req, res, next) => {
    try{

    const galleries = await fetchGalleries();

    if(!galleries.length) {
        return res.status(200).send({galleries: [] });
    }

    return res.status(200).send({ galleries });
    } catch (error) {
        next(error);
    }
};

// GET /api/galleries/:id
exports.getGalleryById = async (req, res, next) => {
    try{

        const { id } = req.params;

        const gallery = await fetchGalleryById(id);

        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }

        return res.status(200).send({ gallery });
        } catch (error) {
        next(error);
    }
};

// POST /api/galleries
exports.createGallery = async (req, res, next) => {
    try{

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

        } catch (error) {
        next(error);
    }
    };

// PUT /api/galleries/:id

exports.updateGallery = async (req, res, next) => {
    try{
   
        const { id } = req.params;
        const { contact_email } = req.body;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "No fields provided to update" });
        }

        if (contact_email && !isValidEmail(contact_email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        const gallery = await updateGallery(id, req.body);

        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }

        return res.status(200).send({
            message: "Gallery updated successfully",
            gallery
        });

        } catch (error) {
        next(error);
    }
};

// DELETE /api/galleries/:id
exports.deleteGallery = async (req, res, next) => {
    try{

        const { id } = req.params;

        const gallery = await deleteGallery(id);

        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }

        return res.status(200).send({
            message: "Gallery deleted successfully",
            gallery
        });
        } catch (error) {
        next(error);
    }
};

// GET /api/galleries/:id/exhibitions
exports.getGalleryExhibitions = async (req, res, next) => {
    try{

        const { id } = req.params;

        const gallery = await fetchGalleryById(id);

        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }

        const exhibitions = await fetchGalleryExhibitions(id);

        return res.status(200).send({
            gallery: {
                gallery_id: gallery.gallery_id,
                gallery_name: gallery.gallery_name
            },
            exhibitions
        });
        } catch (error) {
        next(error);
    }

};