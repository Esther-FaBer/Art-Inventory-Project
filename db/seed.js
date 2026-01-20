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
    title VARCHAR(20),
    year_created INT,
    artwork_type  VARCHAR(10),
    medium VARCHAR(20),
    description TEXT,
    price INT,
    status VARCHAR(10),
    VAT status VARCHAR(23),
    edition INT
    );`);

}