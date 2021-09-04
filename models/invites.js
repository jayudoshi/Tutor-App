const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    status:{
        type: String,
        default: "Pending"
    },
    from:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    course:{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
} , {
    timestamps: true
});

module.exports = mongoose.model("Invite" , inviteSchema);