const knex = require('knex');
// require('dotenv').config();

const knexConfig = require('../knexfile.js');

// module.exports = knex(knexConfig[process.env.NODE_ENV]);
module.exports = knex(knexConfig["development"]);
