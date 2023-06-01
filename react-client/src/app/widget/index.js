import React from 'react';
import { Cpu, Mem, Info } from '../components';
import '../../widget.css';

const Widget = (props) => {
    const { data } = props;
    const { osType, cpuModel, coreNumber,cpuSpeed, cpuLoad, systemUptime, freeMemory, totalMemory, usedMemory, memoryUsage, macAddress, isActive } = data
    const cpuWidgetId = `cpu-widget-${macAddress}`;
    const memWidgetId = `cpu-widget-${macAddress}`;
    const cpu = { cpuLoad, cpuWidgetId }
    const mem = { totalMemory,  usedMemory, memoryUsage, freeMemory, memWidgetId }
    const info = { osType, macAddress, systemUptime, cpuModel, coreNumber, cpuSpeed }

    let notActiveDiv = '';
    if (!isActive) {
        notActiveDiv = <div className="not-active">Offline</div>
    }

    return (
        <div className="widget col-sm-12">
            {notActiveDiv}
            <Cpu cpuData={cpu} /> 
            <Mem memData={mem} />
            <Info infoData={info} />
        </div>
    )
}

export default Widget;