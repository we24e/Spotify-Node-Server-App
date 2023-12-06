const dao = require('./dao.js');

function PlaylistRoutes(app) {
    app.post('/api/playlists', async (req, res) => {
        const { title, userId, trackIDs } = req.body;

        try {
            const playlist = await dao.createPlaylist(title, userId, trackIDs);
            res.status(201).json(playlist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete('/api/playlists/:playlistId', async (req, res) => {
        const playlistId = req.params.playlistId;

        try {
            await dao.deletePlaylist(playlistId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/users/:userId/playlists', async (req, res) => {
        const userId = req.params.userId;

        try {
            const playlists = await dao.findPlaylistByUser(userId);
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/playlists', async (req, res) => {
        try {
            const playlists = await dao.findAllPlaylists();
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/playlists/:playlistId', async (req, res) => {
        const { title, trackIDs } = req.body;
        const playlistId = req.params.playlistId;

        try {
            const updatedPlaylist = await dao.updatePlaylist(playlistId, title, trackIDs);
            res.json(updatedPlaylist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.get('/api/playlists/:playlistId', async (req, res) => {
        const { playlistId } = req.params;

        try {
            const playlist = await dao.findPlaylistById(playlistId);
            if (!playlist) {
                return res.status(404).send('Playlist not found');
            }
            res.json(playlist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.put('/api/playlists/:playlistId/add-track', async (req, res) => {
        const { playlistId } = req.params;
        const { trackId } = req.body;
    
        try {
            const updatedPlaylist = await dao.addTrackToPlaylist(playlistId, trackId);
            if (!updatedPlaylist) {
                return res.status(404).send('Playlist not found');
            }
            res.json(updatedPlaylist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

module.exports = PlaylistRoutes;
