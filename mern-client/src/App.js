import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    // Make a GET request to your custom backend
    fetch('http://localhost:3000/api')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Response from Backend:</h1>
      <p>{data.message}</p>
    </div>
  );
}

export default App;
