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
    setDate(new Date().toLocaleDateString('pt-BR'));
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
              value={task}
              onChange={ handleOnChange }
            />
          </label>
      </section>
    </div>
  )
}

export default AddTasks;