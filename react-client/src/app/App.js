import { useState, useEffect } from 'react';
import socket from '../utils/socketConnection';
import './App.css';

function App() {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    socket.on('data', (data) => {
      console.log(data);
    })
  }, []);

  return (
    <div className="App">
      Hello from client
    </div>
  );
}

export default App;
