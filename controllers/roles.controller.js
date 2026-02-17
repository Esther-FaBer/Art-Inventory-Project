const { fetchRoles, fetchRoleById, insertRole } = require("../models/roles.model");

// GET /api/roles
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

// GET /api/roles/:id
exports.getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const role = await fetchRoleById(id);

        if (!role) {
            return res.status(404).send({ message: "Role not found" });
        }

        return res.status(200).send({ role });

    } catch (error) {
        next(error);
    }
};

// POST /api/roles
exports.createRole = async (req, res, next) => {
    try {
        const { role_name } = req.body;

        // Required field
        if (!role_name) {
            return res.status(400).send({ message: "Role name is required" });
        }

        const role = await insertRole(req.body);

        return res.status(201).send({
            message: "Role created successfully",
            role
        });

    } catch (error) {
        next(error);
    }
};