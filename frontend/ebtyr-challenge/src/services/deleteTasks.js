import axios from "axios"
const URL = 'http://localhost:3001/tasks'

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default deleteTask;