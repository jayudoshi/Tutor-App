const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    phoneNo:{
        type: String
    },
    otp:{
        type: String
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '3m' },
    },
} , {
    timestamps: true,
});

module.exports = mongoose.model("Otp" , otpSchema);