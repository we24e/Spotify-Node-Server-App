const mongoose = require('mongoose');
const schema = require('./schema.js');
const model = mongoose.model("users", schema);
module.exports = model;