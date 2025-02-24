import React, { useState, useEffect } from 'react';
import Home from './Home'
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');

  console.log();

  useEffect(() => {

    async function getToken() {
        const response = await fetch('http://localhost:5000/auth/token');
        const json = await response.json();
        setToken(json.access_token);
    }
    
    getToken();


  }, []);

  return (
    <>
        { (token === null || token ==='') ? <Login/> :  <Home token={token} /> }
    </>
  );
}

export default App;
