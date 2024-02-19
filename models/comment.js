const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Comment;