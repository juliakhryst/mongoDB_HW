const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        minLenght: 5,
        maxLength: 400,
        required: true
        // index: String
        //type: mongoose.Types.ObjectId
    },
    subtitle: {
        type: String,
        minLenght: 5,
        required: false
    },
    description: {
        type: String,
        minLenght: 5,
        maxLength: 5000,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: String,
        required: true,
        enum: ['sport', 'games', 'history']
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', ArticleSchema);