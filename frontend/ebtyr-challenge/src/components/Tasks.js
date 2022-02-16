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
    setTask
  } = useContext(Context);

  const [tasksArray,setTasksArray] = useState([]);
  const [loadArray, setLoadArray] = useState(false);

  const getArray = () => {
    axios.get('http://localhost:3001/tasks',{ teste: 'TESTE'})
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
    setTask('');
  }

  const editStatus = (id, value) => {
    axios.put(`http://localhost:3001/tasks/${id}`, { status: value}).then(res => console.log(res))
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`).then(res => console.log(res))
  }

  const handleOnClick = () => {
    setLoadAdd(true);
  };

  const handleOnChangeSelect = (event) => {
    console.log(event.target.id)
    console.log(event.target.value)
    editStatus(event.target.id,event.target.value);
    getArray();
    setLoadArray(true);
  };

  const handleOnClickDelete = (event) => {
    console.log(event.target);
    deleteTask(event.target.id);
    getArray();
    setLoadArray(true);
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

  const sort = (value) => {
    switch(value) {
    case 'tarefas':
      axios.get('http://localhost:3001/tasks/sortbytask')
        .then(res => {
          setTasksArray(res.data);
        });
      break;
    case 'criado':
      axios.get('http://localhost:3001/tasks/sortbycreated')
        .then(res => {
          setTasksArray(res.data);
        });
        break;
    case 'status':
      axios.get('http://localhost:3001/tasks/sortbydate')
        .then(res => {
          setTasksArray(res.data);
      })
      break;
    }
  };

  const handleOnChangeSorted = (event) => {
    sort(event.target.value);
    getArray();
    setLoadArray(true);
  }

    return(
      <main className="container-sm">
        <section>
         <span>Ordenar por:</span>
          <select
            onClick={handleOnChangeSorted}
          > 
            <option value="tarefas">Tarefas</option>
            <option value="criado">Criado em</option>
            <option value="status">Status</option>
          </select>
        </section>
        <section>
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
                    <Button
                      id={_id}                      
                      onClick={ handleOnClickDelete }
                    >
                      Deletar
                    </Button>
                  </tr>
            )})}
            </tbody>
          </table>
          </section>
          <section>
            <Button
              type="submit"
              onClick={ handleOnClick } 
            >Adicionar tarefa</Button>
          </section>
      </main>
    )
  }

export default Tasks;