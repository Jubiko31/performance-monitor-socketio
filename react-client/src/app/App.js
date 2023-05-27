import { useState, useEffect } from 'react';
import socket from '../utils/socketConnection';
import Widget from './widget';
import { Cpu, Mem, Info } from './components';
import './App.css';

function App() {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    socket.on('data', (data) => {
      console.log(data);
    })
  }, []);

  return (
    <div>
      <Widget />
      <Cpu />
      <Mem />
      <Info />
    </div>
  );
}

export default App;
