import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Context from "../context";
import axios from 'axios';

function Tasks() {
  const {
    task,
    loadAdd,
    setLoadAdd,
    date,
    status,  
    setStatus  
  } = useContext(Context);

  const [tasksArray,setTasksArray] = useState([]);
  const [loadArray, setLoadArray] = useState(false);

  const handleOnClick = () => {
    setLoadAdd(true);
  };

  const handleOnChangeSelect = (event) => {
    console.log(event.target.id)
    console.log(event.target.key)
    setStatus(event.target.value);
  }

  const getArray = () => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        console.log(res.data);
        setTasksArray(res.data);
    })
  }

  const newData = () => {
    setLoadAdd(false);
    setLoadArray(true);
    axios.post('http://localhost:3001/tasks', {
      task,
      status,
      created: date,
    })
     .then(res => {
       console.log(res)
     })
    getArray()
  }

  useEffect(() => {
    getArray();
  }, []);

  useEffect(() => {
    const loadPage = () => {
      if(loadAdd === true) {
       newData();
      }
    };
    loadPage();
  });

  useEffect(() => {
    if(loadArray === true) {
      getArray();
      setLoadArray(false);
    } 
  }, [tasksArray]);

    return(
      <section className="container" id="section-list">
        <main>
          <table>
            <thead>
              <tr>
              <th>Tarefas: </th>
              <th>Criado em: </th>
              <th>Status: </th>
              </tr>
            </thead>
            <tbody>
              { tasksArray.map(({ _id, task, created, status }, index) => { 
                return (
                  <tr key={_id}>
                    <td>{task}</td>
                    <td>{created}</td>
                    <td>
                      <select
                        key={index}
                        id={_id}
                        value={status}
                        onChange={handleOnChangeSelect}
                      >
                        <option value="pendente">pendente</option>
                        <option value="em andamento">em andamento</option>
                        <option value="terminado">terminado</option>
                      </select>
                    </td>
                    <Button>Deletar</Button>
                  </tr>
            )})}
            </tbody>
          </table>
          
          </main>
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