const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    itemId: String, 
    itemType: { type: String, enum: ['album', 'track', 'artist'] }, 
    itemTitle: String
  },
  { collection: "likes" }
);

module.exports = schema;
