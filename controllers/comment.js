const Comment = require('../models/comment');
const sequelize = require('../util/db');

exports.postAddComment = async (req, res , next) => {

    console.log('backend' , req.body.commentText);

    if (!req.body.commentText) {
        throw new Error('Comment cannot be blank');
    };

    try{
        const text = req.body.commentText;
        const postId = req.body.postId

        const data = await Comment.create({text: text, postId: postId});

        res.status(201).json({newCommentDetail: data});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

exports.getAllComments = (req, res, next) => {
    const postId = req.query.id;
    Comment.findAll({
            where: {
                postId: postId
            }
        })
        .then(data => {
            res.status(200).json({allCommentDetail: data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};