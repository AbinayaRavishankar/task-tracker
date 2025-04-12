const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    completed:{
        default: false,
        type: Boolean
    },
    date:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("task",taskSchema)