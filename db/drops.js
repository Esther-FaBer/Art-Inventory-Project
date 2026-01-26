const db = require("./connection");

async function dropTables() {
    await db.query(`DROP TABLE IF EXISTS artwork_exhibitions;`);
    await db.query(`DROP TABLE IF EXISTS contact_roles;`);
    await db.query(`DROP TABLE IF EXISTS artworks;`);
    await db.query(`DROP TABLE IF EXISTS exhibitions;`);
    await db.query(`DROP TABLE IF EXISTS contacts;`);
    await db.query(`DROP TABLE IF EXISTS roles;`);
    await db.query(`DROP TABLE IF EXISTS galleries;`);
    await db.query(`DROP TABLE IF EXISTS artists;`);
}

module.exports = dropTables;