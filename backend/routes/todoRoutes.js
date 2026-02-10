const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create
router.post('/', async (req, res) => {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.json(todo);
});

// Read
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(todo);
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
