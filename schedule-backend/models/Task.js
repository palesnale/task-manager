const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    category: String,
    status: {type: String, default: "Pending"},
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('Task', TaskSchema);