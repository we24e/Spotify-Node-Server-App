const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        reviewText: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        itemType: String,
        itemID: String,
    },
    { collection: "reviews" }
);

module.exports = reviewSchema;
