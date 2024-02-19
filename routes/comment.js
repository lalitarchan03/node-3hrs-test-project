const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

router.post('/add-comment', commentController.postAddComment);

router.get('/get-comment', commentController.getAllComments);

// router.delete('/remove-expense/:id', expenseController.deleteExpense);

// router.put('/update-expense/:id', expenseController.updateExpense);

module.exports = router;