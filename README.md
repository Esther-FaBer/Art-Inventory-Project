# Art Inventory

This repository contains the source code for a RESTful backend server designed to manage an art inventory system.

The server is built with Node.js and Express, and it interacts with a PostgreSQL database for storing and retrieving artwork-related data.

You will need a PostgreSQL instance running on your local machine to get started.

This projet follows the MVC (Model-View-Controller) architecture, this ensures a clean separation of concerts between routes, business logic and the database interaction.

## Project setup

Run `npm install` in the root of repo to install the dependencies required.

Create a `.env.test` file at the root level with the following content:

///
PGDATABASE=inventory_test
///

Create a `.env.dev` file at the root level with the following content:

///
PGDATABASE=inventory_dev
///



