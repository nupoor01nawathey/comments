const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    question: String
});

module.exports = mongoose.model('Question', questionSchema);