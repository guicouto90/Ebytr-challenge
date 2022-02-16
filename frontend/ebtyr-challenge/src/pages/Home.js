import React from "react";
import AddTasks from "../components/AddTask";
import Tasks from "../components/Tasks";

function Home() {
  return(
    <div className="container">
      <header className="container">
          <h1 className="display-3">Minha Lista de Tarefas</h1>
      </header>
      <AddTasks />
      <Tasks />    
  </div>
  )
}

export default Home;