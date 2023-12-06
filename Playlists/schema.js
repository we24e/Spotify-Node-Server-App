const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
    {
        title: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        trackIDs: [{ type: String }]
    },
    { collection: "playlists" }
);

module.exports = playlistSchema;
