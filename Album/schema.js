const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
    {
        release_date: { 
            type: String, 
            default: () => new Date().toISOString().split('T')[0] 
        },
        title: String,
        description: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        trackIDs: [{ type: String }]
    },
    { collection: "albums" }
);

module.exports = albumSchema;
