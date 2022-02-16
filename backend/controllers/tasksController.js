const { validateTask, newTask, getAllTasks, editStatus, eraseTask, validateTaskEdit } = require("../services/tasksService");

const listAllTasks = async(req, res, next) => {
  try {
    const result = await getAllTasks();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}
const addTask = async(req, res, next) => {
  try {
    const { task, status, created } = req.body;
    validateTask(task, status);
    const result = await newTask(task, status, created);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const edit = async(req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    validateTaskEdit(status);
    const result = await editStatus(id,status)
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

const erase = async(req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eraseTask(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = {
  addTask,
  listAllTasks,
  edit,
  erase,
}