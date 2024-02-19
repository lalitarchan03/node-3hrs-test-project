const Comment = require('../models/comment');
const sequelize = require('../util/db');

exports.postAddComment = async (req, res , next) => {

    // console.log('backend' , req.body);

    if (!req.body.link || !req.body.description) {
        throw new Error('Comment cannot be blank');
    };

    try{
        const text = req.params.text;

        const data = await Comment.create({text: text});

        res.status(201).json({newCommentDetail: data});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll()
        .then(data => {
            res.status(200).json({allCommentDetail: data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};