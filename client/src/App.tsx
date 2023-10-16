import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const url = "http://localhost:3001";
function App() {
  const [data, setData] = useState({message: ""});
  
  useEffect(() => {
    axios.get(url+'/data').then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [setData])
  
  return (
    <div className="App">
      <header className="App-header">        
        <h1>Першa сторінка застосунку</h1>
        <p>{data.message}</p>
        
      </header>
    </div>
  );
}

export default App;
