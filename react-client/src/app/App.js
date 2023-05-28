import { useState, useEffect } from 'react';
import socket from '../utils/socketConnection';
import Widget from './widget';
import './App.css';

function App() {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    socket.on('data', (data) => {
      const currentState = ({...performanceData});
      currentState[data.macA] = data;
      setPerformanceData(currentState);
    })
  }, []);

  let widgets = [];
  Object.entries(performanceData).forEach(([key, value]) => {
    widgets.push(<Widget key={key} data={value} />)
  })

  return (
    <div>
      {widgets}
    </div>
  );
}

export default App;
