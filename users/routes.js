const dao = require('./dao.js');

let currentUser = null;
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    }

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        res.json(status);
    };

    const signup = async (req, res) => {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({ message: "Missing username or password" });
            }

            const user = await dao.findUserByUsername(req.body.username);
            if (user) {
                return res.status(400).json({ message: "Username already taken" });
            }

            const currentUser = await dao.createUser(req.body);
            res.json(currentUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };


    const signin = async (req, res) => {
        const { username, password } = req.body;
        currentUser = await dao.findUserByCredentials(username, password);
        if (!currentUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        res.json(currentUser);
    };

    const signout = (req, res) => {
        currentUser = null;
        res.json(200);
    };

    const profile = async (req, res) => {
        res.json(currentUser);
    };

    const getFollowers = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user.followers);
    };

    const getFollowing = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user.following);
    };

    app.post("/api/users/follow", async (req, res) => {
        if (!currentUser) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userIdToFollow = req.body.userId;
        try {
            await dao.followUser(userIdToFollow, currentUser._id);
            res.json({ message: "Followed successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    app.post("/api/users/unfollow", async (req, res) => {
        if (!currentUser) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userIdToUnfollow = req.body.userId;
        try {
            await dao.unfollowUser(userIdToUnfollow, currentUser._id);
            res.json({ message: "Unfollowed successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
    app.get("/api/users/:userId/is-followed-by-current-user", async (req, res) => {
        if (!currentUser) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userIdToCheck = req.params.userId;
        try {
            const user = await dao.findUserById(userIdToCheck);
            const isFollowing = user.followers.includes(currentUser._id);
            res.json({ isFollowing });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
    app.get("/api/users/:userId/followers", getFollowers);
    app.get("/api/users/:userId/following", getFollowing);
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/login", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}

module.exports = UserRoutes;