const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    category: String,
    status: {type: String, default: "Pending"}
});

module.exports = mongoose.model('Task', TaskSchema);