import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Context from "../context";

function Tasks() {
  const {
    task,
    loadAdd,
    setLoadAdd,
    date,
    status,    
  } = useContext(Context);

  const [tasksArray,setTasksArray] = useState([]);

  const handleOnClick = () => {
    setLoadAdd(true);
  };

  useEffect(() => {
    //ONDE SERA FEITO O FETCH PARA ATUALIZAR A PAGINA COM O BACK
    const loadPage = () => {
      if(loadAdd === true) {
        setLoadAdd(false);
        const array = tasksArray;
        const newObject = { task, status, date };
        array.push(newObject);
        setTasksArray(array);
      }
    };
    loadPage();
  });

    return(
      <section className="container" id="section-list">
          <ol id="lista-tarefas" className="list-group list-group-numbered">
            { tasksArray.map(({ task, date }) => { 
              return (
                <section key={task}>
                  <li>
                    <span>Tarefa: {task}</span>
                    <span>Criada em: {date}</span>
                    <Button>Editar</Button>
                    <Button>Deletar</Button>
                  </li>
                </section>
             )})}
          </ol>
          <span>
            <Button
              type="submit"
              onClick={ handleOnClick } 
            >Adicionar tarefa</Button>
          </span>
      </section>
    )
  }

export default Tasks;