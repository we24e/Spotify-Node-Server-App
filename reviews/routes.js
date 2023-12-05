const dao = require('./dao.js'); 

function ReviewsRoutes(app) {
    app.post('/api/reviews', async (req, res) => {
        const { reviewText, userId, itemType, itemID } = req.body;

        try {
            const review = await dao.createReview(reviewText, userId, itemType, itemID);
            res.status(201).json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete('/api/reviews/:reviewId', async (req, res) => {
        const reviewId = req.params.reviewId;

        try {
            await dao.deleteReview(reviewId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/items/:itemID/reviews', async (req, res) => {
        const itemID = req.params.itemID;

        try {
            const reviews = await dao.findReviewsForItem(itemID);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get('/api/users/:userId/reviews', async (req, res) => {
        const userId = req.params.userId;

        try {
            const reviews = await dao.findReviewsByUser(userId);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.get('/api/reviews', async (req, res) => {
        try {
            const reviews = await dao.getAllReviews();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.get('/api/reviews/latest', async (req, res) => {
        try {
            const reviews = await dao.getLatest5Reviews();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

module.exports = ReviewsRoutes;
