const express = require('express');
const router = express.Router();

const Task = require('../models/Task');


router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task)
            return res.status(400).json({error: 'Task not found!'});
        res.json(task);
    }
    catch(err) {
        res.status(500).json({error: 'Server error'});
    }
});

router.post('/', async(req, res) => {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
});

router.put('/:id', async(req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedTask)
            return res.status(404).send('Task not found!');
        res.json(updatedTask);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: 'Task Deleted'});
});

module.exports = router;
