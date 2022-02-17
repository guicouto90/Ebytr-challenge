import axios from "axios"
const URL = 'http://localhost:3001/tasks'

const getTasks = async () => {
  try {
    const response = await axios.get(URL);
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    console.error(error);
  }
};

export default getTasks;