const { fetchRoles } = require("../models/roles.model");

exports.getRoles = async (req, res, next) => {
    try {
    const roles = await fetchRoles();

    if(!roles.length) {
        return res.status(200).send({ roles: []});

    }
    return  res.status(200).send({ roles });
    
    } catch (error) {
        next(error);
    }
};