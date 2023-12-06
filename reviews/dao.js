const model = require('./model.js');

const createReview = (reviewText, userId, itemType, itemID) =>
    model.create({ reviewText, userId, itemType, itemID });

const deleteReview = (reviewId) =>
    model.deleteOne({ _id: reviewId });

const findReviewsForItem = (itemID) =>
    model.find({ itemID: itemID }).populate("userId");

const findReviewsByUser = (userId) =>
    model.find({ userId: userId });

const getAllReviews = () =>
    model.find({}).populate("userId");

const getLatest5Reviews = () =>
    model.find({}).sort({ _id: -1 }).limit(5).populate("userId");
    
module.exports = {
    createReview,
    deleteReview,
    findReviewsForItem,
    findReviewsByUser,
    getAllReviews,
    getLatest5Reviews

};