const mongoose = require('mongoose');
const schema = require('./schema.js');
const model = mongoose.model("reviews", schema);
module.exports = model;
