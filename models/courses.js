const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    grade:{
        type: String
    },
    board:{
        type: String
    },
    subject:{
        type: String
    },
    language:{
        type: String
    },
    mode:{
        type: String
    },
    timings:{
        type: String
    },
    fees:{
        type: String
    },
    about:{
        type: String
    },
    level:{
        type: String
    },
    image:{
        type: String
    },
    invites:[{
        type: mongoose.Types.ObjectId,
        ref: "Invite"
    }],
    students:[{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    tutor:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
} , {
    timestamps: true
});

module.exports = mongoose.model("Course" , courseSchema);