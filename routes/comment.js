const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.post('/add-comment', commentController.postAddComment);

router.get('/get-comments', commentController.getAllComments);


module.exports = router;