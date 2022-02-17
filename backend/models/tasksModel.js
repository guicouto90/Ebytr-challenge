const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findTasks = async() => {
  const connect = await connection();
  const result = await connect.collection('tasks').find().toArray();

  return result;
};

/*const findTasksSortedByStatus = async() => {
  const connect = await connection();
  const result = await connect.collection('tasks').find().sort({ 'status': 1 }).toArray();

  return result;
};

const findTasksSortedByTask = async() => {
  const connect = await connection();
  const result = await connect.collection('tasks').find().sort({ 'task': 1 }).toArray();

  return result;
};

const findTasksSortedByCreated = async() => {
  const connect = await connection();
  const result = await connect.collection('tasks').find().sort({ 'created': 1 }).toArray();

  return result;
};*/

const createNewTask = async(task, status, created) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('tasks').insertOne({ task, status, created });

  return insertedId;
};

const updateStatus = async(id, status) => {
  const connect = await connection();
  await connect.collection('tasks').updateOne(
    {_id: ObjectId(id) },
    { $set: { status }},
  )
};

const deleteTask = async(id) => {
  const connect = await connection();
  await connect.collection('tasks').deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  createNewTask,
  findTasks,
  updateStatus,
  deleteTask,
  //findTasksSortedByCreated,
  //findTasksSortedByTask,
  //findTasksSortedByStatus
}
