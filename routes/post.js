const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.post('/add-post', postController.postAddPost);

router.get('/get-posts', postController.getAllPosts);

// router.delete('/remove-expense/:id', expenseController.deleteExpense);

// router.put('/update-expense/:id', expenseController.updateExpense);

module.exports = router;