const { fetchRoles, 
    fetchRoleById, 
    insertRole,
    updateRole: updateRoleInDb,
    deleteRole: deleteRoleFromDb
 } = require("../models/roles.model");

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

// PUT /api/roles/:id
exports.updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: 'No fields provided to update' });
        }
        
        const role = await updateRoleInDb(id, req.body);
        
        if (!role) {
            return res.status(404).send({ message: 'Role not found' });
        }
        
        return res.status(200).send({
            message: 'Role updated successfully',
            role
        });
        
    } catch (error) {
        next(error);
    }
};