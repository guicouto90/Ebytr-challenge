import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from '.';

function Provider({ children }) {

  const [task, setTask] = useState('');
  const [status, setStatus] = useState('pendente');
  const [date, setDate] = useState(new Date().toISOString());
  const [tasksArray, setTaksArray] = useState([]);
  const [loadAdd, setLoadAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const context = {
    task,
    setTask,
    status,
    setStatus,
    date,
    setDate,
    tasksArray, 
    setTaksArray,
    loadAdd,
    setLoadAdd,
    isLoading,
    setIsLoading
  };

  return(
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;