import axios from "axios"
const URL = 'http://localhost:3001/tasks'

const editTask = async (id, status) => {
  try {
    const response = await axios.put(`${URL}/${id}`, {
      status,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default editTask;