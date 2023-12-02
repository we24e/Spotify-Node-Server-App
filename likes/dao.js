const model = require('./model.js');

const findAllLikes = () => model.find();
const createUserLike = (userId, itemId, itemType, itemTitle) =>
    model.create({ user: userId, itemId, itemType, itemTitle });
const deleteUserLike = (userId, itemId) =>
    model.deleteOne({ user: userId, itemId });
const findUsersThatLikeItem = (itemId) =>
    model.find({ itemId }).populate("user");
const findItemsUserLikes = (userId, itemType) =>
    model.find({ user: userId, itemType });
const checkIfUserLikedItem = (userId, itemId) => 
    model.findOne({ user: userId, itemId });
module.exports = {
    findAllLikes,
    createUserLike,
    deleteUserLike,
    findUsersThatLikeItem,
    findItemsUserLikes,
    checkIfUserLikedItem
};