const { roles } = require("../models/roles.model");

exports.getRoles = async (req, res, next) => {
    const galleries = await fetchRoles();

    if(!roles.length) {
        return res.status(200).send({ roles: []});

    }
    return  res.status(200).send({ roles });
}