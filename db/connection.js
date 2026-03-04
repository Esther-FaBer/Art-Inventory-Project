const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ 
    path: `${__dirname}/../.env.${ENV}` 
});

if (!process.env.PGDATABASE) {
    throw new Error('PGDATABASE not set');
}

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 10,

});

module.exports = pool;