const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        firstName:{
            type: String,
            minLenght: 4,
            maxLength: 50,
            required: true
        },
        lastName: {
             type: String,
             minLenght: 3,
             maxLength: 60,
             required: true
        },
        role: {
             type: String,
             enum:['admin','writer','guest']
        },
        createdAt: {
             type: Date,
             default: Date.now
        },
        numberOfArticles:{ 
             type: Number,
             default: 0,
             required: false
        },
        nickname: {
             type: String,
             required: false
        }
});

module.exports = mongoose.model('User', UserSchema);