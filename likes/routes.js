const dao = require('./dao.js');

function LikesRoutes(app) {
  const findAllLikes = async (req, res) => {
    try {
      const likes = await dao.findAllLikes();
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createUserLike = async (req, res) => {
    const userId = req.params.userId;
    const { itemId, itemType } = req.body;
  
    try {
      const like = await dao.createUserLike(userId, itemId, itemType);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const deleteUserLike = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
      await dao.deleteUserLike(userId, itemId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findUsersThatLikeItem = async (req, res) => {
    const itemId = req.params.itemId;
    try {
      const likes = await dao.findUsersThatLikeItem(itemId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const checkIfUserLikedItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.query.itemId;
    try {
        const like = await dao.checkIfUserLikedItem(userId, itemId);
        res.json(!!like); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  const findItemsUserLikes = async (req, res) => {
    const userId = req.params.userId;
    const itemType = req.query.type;
    try {
      const likes = await dao.findItemsUserLikes(userId, itemType);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  app.get("/api/users/:userId/likes/check", checkIfUserLikedItem);
  app.get("/api/likes", findAllLikes);
  app.post("/api/users/:userId/likes", createUserLike);
  app.delete("/api/users/:userId/likes/:itemId", deleteUserLike);
  app.get("/api/likes/:itemId/users", findUsersThatLikeItem);
  app.get("/api/users/:userId/likes", findItemsUserLikes);
}

module.exports = LikesRoutes;
