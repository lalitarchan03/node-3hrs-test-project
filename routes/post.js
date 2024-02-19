const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.post('/add-post', postController.postAddPost);

router.get('/get-posts', postController.getAllPosts);


module.exports = router;