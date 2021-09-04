const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    task:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const taskSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    tasks: [task]
} , {
    timestamps: true
});

module.exports = mongoose.model("Task" , taskSchema);