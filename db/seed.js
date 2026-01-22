async function seed(artist, artworks) {

//drop existing tables
    await dropTables();

//create artist table
await db.query(`CREATE TABLE artists(
    artist_id SERIAL PRIMARY KEY,
    artist_name VARCHAR NOT NULL,
    birth_year INT NOT NULL,
    death_year INT,
    nationality VARCHAR(20),
    biography TEXT
    );`);

//create artworks table
await db.query(`CREATE TABLE artworks(
    artwork_id SERIAL PRIMARY KEY,
    artist_id SERIAL FOREIGN KEY,
    title VARCHAR(20) NOT NULL,
    year_created INT,
    artwork_type  VARCHAR(10),
    medium VARCHAR(255),
    description TEXT,
    price INT,
    status VARCHAR(10),
    VAT status VARCHAR(23),
    edition INT
    );`);

//create exhibitions table
await db.query(`CREATE TABLE exhibitions(
    exhibition_id SERIAL PRIMARY KEY,
    gallery_id SERIAL FOREIGN KEY,
    exhibition_name VARCHAR(50) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
     );`);

//create contacts table
await db.query(`CREATE TABLE contacts(
    contact_id SERIAL PRIMARY KEY,
    contact_type VARCHAR(50), -- person | organization
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(50),
    phone_number VARCHAR(50),
    notes TEXT
    );`);

//create roles table
await db.query(`CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);`);

//create galleries table
await db.query(`CREATE TABLE galleries(
    gallery_id SERIAL PRIMARY KEY,
    gallery_name VARCHAR(20),
    location VARCHAR(50),
    contact_email VARCHAR(50),
    phone_number VARCHAR(50)
    );`);

}