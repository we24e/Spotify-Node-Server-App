const albumModel = require('./model.js');

const createAlbum = (title, description, userId, trackIDs) =>
    albumModel.create({ title, description, userId, trackIDs });

const updateAlbum = (albumId, title, description, trackIDs) =>
    albumModel.findByIdAndUpdate(albumId, { title, description, trackIDs }, { new: true });

const deleteAlbum = (albumId) =>
    albumModel.deleteOne({ _id: albumId });

const findAlbumByUser = (userId) =>
    albumModel.find({ userId });

const findAllAlbums = () =>
    albumModel.find({});

const findAlbumById = (albumId) =>
    albumModel.findById(albumId);

const addTrackToAlbum = async (albumId, trackId) => {
    return albumModel.findByIdAndUpdate(
        albumId,
        { $addToSet: { trackIDs: trackId } },
        { new: true }
    );
};

module.exports = {
    createAlbum,
    deleteAlbum,
    findAlbumByUser,
    findAllAlbums,
    updateAlbum,
    findAlbumById,
    addTrackToAlbum
};

