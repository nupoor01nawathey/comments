const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    author: { 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
     },
    question: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        username: String
    },
     comment: String
});

module.exports = mongoose.model('Comment', commentSchema);