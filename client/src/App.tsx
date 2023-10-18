import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/loginForm';
import { url } from './constants/constants';

function App() {
  const [data, setData] = useState();
  
  useEffect(() => {
    axios.get(url+'/').then((response) => {
      setData(response.data.message);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [setData])
  
  return (
    <div className="App">
      <header className="App-header">        
        <h6>{data}</h6>        
      </header>
        <LoginForm/>
    </div>
  );
}

export default App;
