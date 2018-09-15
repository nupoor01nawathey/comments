const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const questionSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    question: String,
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Question', questionSchema);