const Joi = require('@hapi/joi');
const { createNewTask, findTasks, updateStatus, deleteTask } = require('../models/tasksModel');

const taskSchema = Joi.object({
  task: Joi.string().required(),
  status: Joi.string().required(),
});

const taskSchemaEdit = Joi.object({
  status: Joi.string().required(),
});

const validateTask = (task, status) => {
  const { error } = taskSchema.validate({ task, status });
  
  if(error) throw error;

  if(status !== 'pendente' && status !== 'em andamento' && status !== 'terminado') {
    console.log(status)
    const error1 = { status: 400, message: '"status" must be equal to "pendente", "em andamento" or "terminado"'}
    throw error1;
  }
};

const validateTaskEdit = (status) => {
  const { error } = taskSchemaEdit.validate({ status });
  
  if(error) throw error;
  if(status !== 'pendente' && status !== 'em andamento' && status !== 'terminado') {
    const error1 = { status: 400, message: '"status" must be equal to "pendente", "em andamento" or "terminado"'}
    throw error1;
  }
};

const newTask = async (task, status, created) => {
  const taskId = await createNewTask(task, status, created);

  return { _id: taskId, task, status, created };
};

const getAllTasks = async() => {
  const result = await findTasks();

  return result;
}

const editStatus = async(id, status) => {
  await updateStatus(id, status);
  return { message: `Task with ${id} sucessfully updated` }
};

const eraseTask = async(id) => {
  await deleteTask(id);

  return { message: `Task with ${id} sucessfully deleted` }
}

module.exports = {
  validateTask,
  newTask,
  getAllTasks,
  editStatus,
  eraseTask,
  validateTaskEdit
}
