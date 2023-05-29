import React from 'react'
import drawCircle from '../../utils/canvasLoadAnimation';

function Cpu({ cpuData }) {
  console.log(cpuData?.cpuLoad)
  const canvas = document.querySelector('canvas');
  drawCircle(canvas, cpuData?.cpuLoad)
  
  return (
    <div className="col-sm-3 cpu">
        <h3>CPU Load</h3>
        <div className="canvas-wrapper">
            <canvas className="canvas"></canvas>
            <div className="cpu-text">{cpuData?.cpuLoad}</div>
        </div>
    </div>
  )
}

export default Cpu