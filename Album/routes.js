const dao = require('./dao.js');

function AlbumRoutes(app) {
    app.post('/api/albums', async (req, res) => {
        const { title, description, userId, trackIDs } = req.body;
        try {
            const album = await dao.createAlbum(title, description, userId, trackIDs);
            res.status(201).json(album);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete('/api/albums/:albumId', async (req, res) => {
        const albumId = req.params.albumId;
        try {
            await dao.deleteAlbum(albumId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/users/:userId/albums', async (req, res) => {
        const userId = req.params.userId;
        try {
            const albums = await dao.findAlbumByUser(userId);
            res.json(albums);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/albums', async (req, res) => {
        try {
            const albums = await dao.findAllAlbums();
            res.json(albums);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/albums/:albumId', async (req, res) => {
        const { title, description, trackIDs } = req.body;
        const albumId = req.params.albumId;
        try {
            const updatedAlbum = await dao.updateAlbum(albumId, title, description, trackIDs);
            res.json(updatedAlbum);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/albums/:albumId', async (req, res) => {
        const albumId = req.params.albumId;
        try {
            const album = await dao.findAlbumById(albumId);
            if (!album) {
                return res.status(404).send('Album not found');
            }
            res.json(album);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/albums/:albumId/add-track', async (req, res) => {
        const albumId = req.params.albumId;
        const { trackId } = req.body;
        try {
            const updatedAlbum = await dao.addTrackToAlbum(albumId, trackId);
            if (!updatedAlbum) {
                return res.status(404).send('Album not found');
            }
            res.json(updatedAlbum);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

}

module.exports = AlbumRoutes;
