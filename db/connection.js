const monk = require('monk');
const connString = 'localhost/pomotimer';
const db = monk(connString);

module.exports = db;
