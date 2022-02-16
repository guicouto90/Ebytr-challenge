import React, { useContext } from 'react';
import Context from '../context';

function AddTasks() {
  const { 
    setTask, 
    task, 
    setDate, 

  } = useContext(Context);

  const handleOnChange = ({target: { value } } ) => {
    setTask(value);
    setDate(new Date().toISOString());
  };
  
  return(
    <div>
      <section className="container-sm" id="section-text">
          <label htmlFor="tasks">
            Digite sua tarefa:
            <input 
              id="tasks" 
              type="text"
              name="tasks"
              onChange={ handleOnChange }
            />
          </label>
          <p>{task}</p>

      </section>
    </div>
  )
}

export default AddTasks;