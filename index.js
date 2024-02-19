const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./util/db');

const Post = require('./models/post');
const Comment = require('./models/comment');

const cors = require('cors');

const app = express();

app.use(cors());

const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

app.use(bodyParser.json());

app.use('/post', postRoute);
app.use('/comment', commentRoute);

Comment.belongsTo(Post);
Post.hasMany(Comment);

sequelize.sync()
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    });
