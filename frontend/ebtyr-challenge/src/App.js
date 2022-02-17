import './App.css';
import React from 'react';
import Home from './pages/Home';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
       <div className="App">
        <Home/>
      </div>
    </Provider>
   
  );
}

export default App;
