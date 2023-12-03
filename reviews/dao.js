const model = require('./model.js'); 

const createReview = (detail, reviewText, userId, itemType, itemID) =>
    model.create({ detail, reviewText, userId, itemType, itemID });

const deleteReview = (reviewId) =>
    model.deleteOne({ _id: reviewId });

const findReviewsForItem = (itemID) =>
    model.find({ itemID: itemID }).populate("userId");

const findReviewsByUser = (userId) =>
    model.find({ userId: userId });

module.exports = {
    createReview,
    deleteReview,
    findReviewsForItem,
    findReviewsByUser,
};

