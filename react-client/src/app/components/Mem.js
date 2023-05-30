import React from 'react'
import drawCircle from '../../utils/canvasLoadAnimation';

function Mem({ memData }) {
  const { totalMemory, usedMemory, freeMemory, memoryUsage } = memData;
  
  const canvas = document.querySelector('.memCanvas')
  const totalMemInGB = Math.floor(totalMemory/1073741824*100)/100
  const freeMemInGB = Math.floor(freeMemory/1073741824*100)/100
  drawCircle(canvas, memoryUsage*100)

  return (
    <div className="mem col-3">
        <h3>Memory Usage</h3>
        <div className="canvas-wrapper">
            <canvas className="memCanvas" width="200" height="200"></canvas>
            <div className='mem-text'>
                {memoryUsage*100}%
            </div>
        </div>
        <div>
            Total Memory: {totalMemInGB}gb
        </div>
        <div>
            Free Memory: {freeMemInGB}gb
        </div>
    </div>
  )
}

export default Mem