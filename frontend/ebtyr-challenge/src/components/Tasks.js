import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Context from "../context";
import getTasks from "../services/getTasks";
import postTasks from "../services/postTasks";
import editTask from "../services/editTasks";
import deleteTask from "../services/deleteTasks";

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

  //Funcao para carregar os dados da API e setar o array de dados;
  const getArray = async () => {
    const tasks = await getTasks();
    setTasksArray(tasks)
  };

  //Funcao para criar novas tarefas na API e setar o array de dados;
  const newData = async () => {
    setLoadAdd(false);
    setLoadArray(true);
    await postTasks(task, status, date);
    getArray()
    setTask('');
  }

  //Funcao para habilitar o useEffect de quando uma nova tarefa é adicionada na API
  const handleOnClick = () => {
    setLoadAdd(true);
  };

  //Funcao para editar o status e recarregar o array de dados principal
  const handleOnChangeSelect = ({target: { id, value }}) => {
    editTask(id, value);
    getArray();
    setLoadArray(true);
  };

  //Funcao para deletar o status e recarregar o array de dados principal
  const handleOnClickDelete = ( {target: { id } } ) => {
    deleteTask(id);
    getArray();
    setLoadArray(true);
  }

  //useEffect de quando a pagina é carregada pela primeira vez: componentDidMount
  useEffect(() => {
    getArray();
  }, []);

  //useEffect de quando a pagina é atualizada com novos dados: componentDidUpdate
  useEffect(() => {
    const loadPage = () => {
      if(loadAdd === true) {
       newData();
      }
    };
    loadPage();
  });

  //useEffect de quando o array tasksArray é atualizado: componentDidUpdate
  useEffect(() => {
    if(loadArray === true) {
      getArray();
      setLoadArray(false);
    } 
  }, [tasksArray]);

  /*const handleOnChangeSorted = (event) => {
    sort(event.target.value);
    getArray();
    setLoadArray(true);
  }*/

    return(
      <main className="container-sm">
        <section>
         <span>Ordenar por:</span>
          <select
            //onClick={handleOnChangeSorted}
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