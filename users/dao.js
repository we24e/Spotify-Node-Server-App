const model = require('./model.js');

const createUser = (user) => model.create(user);
const findAllUsers = () => model.find();
const findUserById = (userId) => model.findById(userId);
const findUserByUsername = (username) => model.findOne({ username: username });
const findUserByCredentials = (username, password) => model.findOne({ username, password });
const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
const deleteUser = (userId) => model.deleteOne({ _id: userId });

const followUser = async (userId, followerId) => {
    await model.updateOne({ _id: userId }, { $addToSet: { followers: followerId } });
    await model.updateOne({ _id: followerId }, { $addToSet: { following: userId } });
};

const unfollowUser = async (userId, followerId) => {
    await model.updateOne({ _id: userId }, { $pull: { followers: followerId } });
    await model.updateOne({ _id: followerId }, { $pull: { following: userId } });
};

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser
};
