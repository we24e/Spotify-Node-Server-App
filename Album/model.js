const mongoose = require('mongoose');
const schema = require('./schema.js');
const model = mongoose.model("albums", schema);
module.exports = model;