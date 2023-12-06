const model = require('./model.js');

const createPlaylist = (title, userId, trackIDs) =>
    model.create({ title, userId, trackIDs });

const deletePlaylist = (playlistId) =>
    model.deleteOne({ _id: playlistId });

const findPlaylistByUser = (userId) =>
    model.find({ userId });

const findAllPlaylists = () =>
    model.find({});

const updatePlaylist = (playlistId, title, trackIDs) =>
    model.findByIdAndUpdate(playlistId, { title, trackIDs }, { new: true });

const findPlaylistById = (playlistId) =>
    model.findById(playlistId);

const addTrackToPlaylist = async (playlistId, trackId) => {
    return model.findByIdAndUpdate(
        playlistId,
        { $addToSet: { trackIDs: trackId } },
        { new: true }
    );
};
const deleteTrackFromPlaylist = async (playlistId, trackId) => {
    return model.findByIdAndUpdate(
        playlistId,
        { $pull: { trackIDs: trackId } },
        { new: true }
    );
};
module.exports = {
    createPlaylist,
    deletePlaylist,
    findPlaylistByUser,
    findAllPlaylists,
    updatePlaylist,
    findPlaylistById,
    addTrackToPlaylist,
    deleteTrackFromPlaylist
};
