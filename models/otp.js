const mongoose = require('mongoose');


const optSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'users'
    },
    otp : {
        type : Number
    },
    createdAt: {
        type : Date,
        required : true
    },
    expiresAt : {
        type : Date,
        required : true
    }
}, {
    timestamps : true
});

const Otp = mongoose.model('otp', optSchema);

module.exports = Otp;