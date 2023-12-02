const mongoose = require('mongoose');
const schema = require('./schema.js');
const model = mongoose.model("likes", schema);
module.exports = model;
