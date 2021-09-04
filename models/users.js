const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    phoneNo:{
        type: String,
    },
    fname:{
        type: String
    },
    lname:{
        type: String
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        default: "Student"
    },
    studentProfile: {
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    tutorProfile:{
        type: mongoose.Types.ObjectId,
        ref: 'Tutor'
    }
} , {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User" , userSchema);