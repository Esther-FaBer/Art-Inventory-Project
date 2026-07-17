const db = require("./connection");
const format = require("pg-format");
const dropTables = require("./drops");

// Import the JSON data files directly
const artists     = require("./dev/artists.json");
const galleries   = require("./dev/galleries.json");
const roles       = require("./dev/roles.json");
const contacts    = require("./dev/contacts.json");
const artworks    = require("./dev/artworks.json");
const exhibitions = require("./dev/exhibitions.json");

async function seed() {

  // Drop all existing tables
  await dropTables();

  // Create artists table
  await db.query(`CREATE TABLE artists (
    artist_id   SERIAL PRIMARY KEY,
    artist_name VARCHAR(255) NOT NULL,
    birth_year  INT NOT NULL,
    death_year  INT,
    nationality VARCHAR(50),
    biography   TEXT
  );`);

  // Create galleries table
  await db.query(`CREATE TABLE galleries (
    gallery_id    SERIAL PRIMARY KEY,
    gallery_name  VARCHAR(255),
    address       VARCHAR(255),
    city          VARCHAR(100),
    country       VARCHAR(100),
    contact_email VARCHAR(100),
    phone_number  VARCHAR(50),
    website       VARCHAR(255),
    description   TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

  // Create roles table
  await db.query(`CREATE TABLE roles (
    role_id   SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
  );`);

  // Create contacts table
  await db.query(`CREATE TABLE contacts (
    contact_id   SERIAL PRIMARY KEY,
    contact_type VARCHAR(50),
    contact_name VARCHAR(255) NOT NULL,
    email        VARCHAR(100),
    country_code VARCHAR(5),
    phone_number VARCHAR(50),
    address      VARCHAR(255),
    city         VARCHAR(100),
    country      VARCHAR(100),
    notes        TEXT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

  // Create artworks table
  await db.query(`CREATE TABLE artworks (
    artwork_id   SERIAL PRIMARY KEY,
    artist_id    INT REFERENCES artists(artist_id) ON DELETE CASCADE,
    title        VARCHAR(255) NOT NULL,
    year_created INT,
    artwork_type VARCHAR(50),
    medium       VARCHAR(255),
    description  TEXT,
    price        DECIMAL(10, 2),
    status       VARCHAR(50),
    vat_status   VARCHAR(50),
    edition      INT
  );`);

  // Create exhibitions table
  await db.query(`CREATE TABLE exhibitions (
    exhibition_id   SERIAL PRIMARY KEY,
    gallery_id      INT REFERENCES galleries(gallery_id),
    exhibition_name VARCHAR(255) NOT NULL,
    start_date      DATE,
    end_date        DATE,
    description     TEXT
  );`);

  // Create join table artworks - exhibitions
  await db.query(`CREATE TABLE artwork_exhibitions (
    artwork_id    INT REFERENCES artworks(artwork_id) ON DELETE CASCADE,
    exhibition_id INT REFERENCES exhibitions(exhibition_id) ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, exhibition_id)
  );`);

  // Create join table contacts - roles
  await db.query(`CREATE TABLE contact_roles (
    contact_id INT REFERENCES contacts(contact_id) ON DELETE CASCADE,
    role_id    INT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (contact_id, role_id)
  );`);

  // Insert artists and get back their IDs
  const insertedArtists = await db.query(
    format(
      "INSERT INTO artists (artist_name, birth_year, death_year, nationality, biography) VALUES %L RETURNING artist_id, artist_name",
      artists.map(a => [a.artist_name, a.birth_year, a.death_year, a.nationality, a.biography])
    )
  );

  // Build a lookup: artist_name -> artist_id
  // Artworks can reference to the correct artist
  const artistMap = {};
  insertedArtists.rows.forEach(row => {
    artistMap[row.artist_name] = row.artist_id;
  });

  // Insert galleries and get back their IDs
  const insertedGalleries = await db.query(
    format(
      "INSERT INTO galleries (gallery_name, address, city, country, contact_email, phone_number, website, description) VALUES %L RETURNING gallery_id, gallery_name",
      galleries.map(g => [g.gallery_name, g.address, g.city, g.country, g.contact_email, g.phone_number, g.website, g.description])
    )
  );

  // Build a lookup: gallery_name -> gallery_id
  // Exhibitions can reference to the correct gallery
  const galleryMap = {};
  insertedGalleries.rows.forEach(row => {
    galleryMap[row.gallery_name] = row.gallery_id;
  });

  // Insert roles
  await db.query(
    format(
      "INSERT INTO roles (role_name) VALUES %L",
      roles.map(r => [r.role_name])
    )
  );

  // Insert contacts
  await db.query(
    format(
      "INSERT INTO contacts (contact_name, email, country_code, phone_number, contact_type) VALUES %L",
      contacts.map(c => [c.contact_name, c.email, c.country_code, c.phone_number, c.contact_type])
    )
  );

  // Insert artworks - use artistMap to swap artist_name for artist_id
  await db.query(
    format(
      "INSERT INTO artworks (artist_id, title, year_created, artwork_type, medium, price, status, vat_status, edition) VALUES %L",
      artworks.map(a => [
        artistMap[a.artist_name],
        a.title,
        a.year_created,
        a.artwork_type,
        a.medium,
        a.price,
        a.status,
        a.vat_status,
        a.edition
      ])
    )
  );

  // Insert exhibitions - use galleryMap to swap gallery_name for gallery_id
  await db.query(
    format(
      "INSERT INTO exhibitions (gallery_id, exhibition_name, start_date, end_date, description) VALUES %L",
      exhibitions.map(e => [
        galleryMap[e.gallery_name],
        e.exhibition_name,
        e.start_date,
        e.end_date,
        e.description
      ])
    )
  );

  console.log("Seed completed!");
  await db.end();
}

// Call the seed function
seed().catch(err => {
  console.error("Seed failed:", err);
  db.end();
});