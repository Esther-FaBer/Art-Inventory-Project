const db = require("./connection");
const format = require("pg-format");
const dropTables = require("./drops");


async function seed(artist, galleries, roles, contacts, artworks, exhibitions, artwork_exhibitions, contact_roles) {

//drop existing tables
    await dropTables();

//create artist table
await db.query(`CREATE TABLE artists(
    artist_id SERIAL PRIMARY KEY,
    artist_name VARCHAR(255) NOT NULL,
    birth_year INT NOT NULL,
    death_year INT,
    nationality VARCHAR(50),
    biography TEXT
    );`);

//create galleries table
await db.query(`CREATE TABLE galleries(
    gallery_id SERIAL PRIMARY KEY,
    gallery_name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    contact_email VARCHAR(100),
    phone_number VARCHAR(50)
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

//create roles table
await db.query(`CREATE TABLE roles(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);`);

//create contacts table
await db.query(`CREATE TABLE contacts(
    contact_id SERIAL PRIMARY KEY,
    contact_type VARCHAR(50),
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    country_code VARCHAR(5),
    phone_number VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

//create artworks table
await db.query(`CREATE TABLE artworks(
    artwork_id SERIAL PRIMARY KEY,
    artist_id INT REFERENCES artists(artist_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    year_created INT,
    artwork_type  VARCHAR(50),
    medium VARCHAR(255),
    description TEXT,
    price INT,
    status VARCHAR(50),
    vat_status VARCHAR(50),
    edition INT
    );`);

//create exhibitions table
await db.query(`CREATE TABLE exhibitions(
    exhibition_id SERIAL PRIMARY KEY,
    gallery_id INT REFERENCES galleries(gallery_id),
    exhibition_name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT
     );`);

//create join table artworks - exhibitions
await db.query(`CREATE TABLE artwork_exhibitions(
    artwork_id INT REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    exhibition_id INT REFERENCES exhibitions(exhibition_id ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, exhibition_id)
    );`);

//create join table contacts - roles
await db.query(`CREATE TABLE contact_roles(
    contact_id INT REFERENCES contacts(contact_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(role_id ON DELETE CASCADE,
    PRIMARY KEY (contact_id, role_id)
    );`);

}