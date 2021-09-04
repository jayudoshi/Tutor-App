const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    gender:{
        type: String
    },
    dob:{
        type: Date
    },
    email:{
        type: String
    },
    state:{
        type: String
    },
    city:{
        type: String
    },
    town:{
        type: String
    },
    pinCode:{
        type: String
    },
    grade:{
        type: String
    },
    board:{
        type: String
    },
    stream:{
        type: String
    },
} , {
    timestamps: true
});

module.exports = mongoose.model("Student" , studentSchema);