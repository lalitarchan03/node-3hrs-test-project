const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // amount: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Post;