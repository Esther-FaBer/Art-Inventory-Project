const db = require("../db/connection");

exports.fetchRoles = async() => {

    const { rows:roles } = await db.query(
        `SELECT role_id, role_name`
    ); 
    return roles;
}