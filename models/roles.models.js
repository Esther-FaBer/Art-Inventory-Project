const db = require("../db/connection");

// fetch all roles
exports.fetchRoles = async () => {
    const { rows:roles } = await db.query(
        `SELECT role_id, role_name, description
        FROM roles
        ORDER BY role_name ASC`
    ); 
    return roles;
};

//fecth role by Id
exports.fetchRoleById = async (roleId) => {
    const { rows: roles } = await db.query(
        `SELECT role_id, role_name, description
         FROM roles
         WHERE role_id = $1`,
        [roleId]
    );

    return roles[0];
};

// new role
exports.insertRole = async (roleData) => {
    const { role_name, description } = roleData;

    const { rows: roles } = await db.query(
        `INSERT INTO roles (role_name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [role_name, description]
    );

    return roles[0];
};