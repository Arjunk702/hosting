import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

if(import.meta.env.DEV) {
  axios.defaults.baseURL = `http://localhost:${import.meta.env.VITE_PORT}`;
} else {
  axios.defaults.baseURL = location.origin;
}

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let res = await axios.get("/data");
      setData(res.data);
    })()
  },[]);

  return (
    <>
    <h1>{data.msg}</h1>
    </>
  )
}

export default App
