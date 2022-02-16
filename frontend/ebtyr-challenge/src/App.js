import './App.css';
import React from 'react';
import Home from './pages/Home';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
       <div className="App">
        <h1>TESTE</h1>
        <Home/>
      </div>
    </Provider>
   
  );
}

export default App;
