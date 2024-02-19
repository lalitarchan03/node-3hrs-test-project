const Post = require('../models/post');
const sequelize = require('../util/db');

exports.postAddPost = async (req, res , next) => {

    // console.log('backend' , req.body);

    if (!req.body.link || !req.body.description) {
        throw new Error('Post Link and Description is not mentioned');
    };

    try{
        const link = req.body.link;
        const description = req.body.description;

        const data = await Post.create({link: link, description: description});

        res.status(201).json({newPostDetail: data});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(data => {
            res.status(200).json({allPostDetail: data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};