const express = require('express');
const { listAllTasks, addTask, edit, erase } = require('../controllers/tasksController');
const tasksRouter = express.Router();

tasksRouter.get('/', listAllTasks);

tasksRouter.post('/', addTask);

tasksRouter.put('/:id', edit);

tasksRouter.delete('/:id', erase);

module.exports = tasksRouter;