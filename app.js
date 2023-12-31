const UserRoutes = require('./users/routes.js');
const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const LikesRoutes = require('./likes/routes.js');
const ReviewsRoutes = require('./reviews/routes.js');
const PlaylistRoutes = require('./Playlists/routes.js');
const session = require("express-session");
const AlbumRoutes = require('./Album/routes.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL

    })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


UserRoutes(app);
LikesRoutes(app);
ReviewsRoutes(app);
PlaylistRoutes(app);
AlbumRoutes(app);

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/Project';
mongoose.connect(CONNECTION_STRING);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/getAccessToken', async (req, res) => {
    const client_id = 'bed8cb6c488b4a2cbbd392b2e28e5e9b';
    const client_secret = '46223c275dff4cb1885b2adb69a3e0db';
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const data = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

    try {
        const response = await axios.post(tokenUrl, data, headers);
        process.env.ACCESS_TOKEN = response.data.access_token;
        console.log('Access token retrieved from Spotify:', response.data.access_token);
        res.json({ access_token: response.data.access_token });
    } catch (error) {
        console.error('Error fetching token', error);
        res.status(500).send('Error fetching token');
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);
});
