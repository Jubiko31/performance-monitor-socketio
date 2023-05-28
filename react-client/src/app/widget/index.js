import React from 'react';
import { Cpu, Mem, Info } from '../components';

const Widget = (props) => {
    console.log(props)
    const { data } = props;
    const { osType, cpuModel, coreNumber,cpuSpeed, cpuLoad, systemUptime, freeMemory, totalMemory, usedMemory, memoryUsage, macAddress } = data
    const cpu = { cpuLoad }
    const mem = { totalMemory,  usedMemory, memoryUsage, freeMemory }
    const info = { osType, macAddress, systemUptime, cpuModel, coreNumber, cpuSpeed }

    return (
        <div>
            <h1>Widget</h1>
            <p>{data.cpuLoad}</p>
            <Cpu cpuData={cpu} />
            <Mem memData={mem} />
            <Info infoData={info} />
        </div>
    )
}

export default Widget;