import axios from "axios"
const URL = 'http://localhost:3001/tasks'

const postTasks = async (task, status, created) => {
  try {
    const response = await axios.post(URL, {
      task,
      status,
      created
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export default postTasks;