import React from 'react'
import drawCircle from '../../utils/canvasLoadAnimation';

function Cpu({ cpuData }) {
  const { cpuWidgetId } = cpuData
  const canvas = document.getElementsByClassName(`${cpuWidgetId}`);
  drawCircle(canvas, cpuData?.cpuLoad)
  
  return (
    <div className="col-sm-3 cpu">
        <h3>CPU Load</h3>
        <div className="canvas-wrapper">
            <canvas className={cpuWidgetId} width="200" height="200"></canvas>
            <div className="cpu-text">{cpuData?.cpuLoad}</div>
        </div>
    </div>
  )
}

export default Cpu