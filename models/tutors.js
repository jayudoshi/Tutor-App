const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
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
    highestQualification:{
        type: String
    },
    status:{
        type: String
    },
    currentOccupation:{
        type: String
    },
    collegeName:{
        type: String
    },
    aboutYou:{
        type: String
    },
} , {
    timestamps: true
});

module.exports = mongoose.model("Tutor" , tutorSchema);