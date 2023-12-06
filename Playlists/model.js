const mongoose = require('mongoose');
const schema = require('./schema.js');
const model = mongoose.model("playlists", schema);
module.exports = model;