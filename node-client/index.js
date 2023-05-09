const os = require('os');

const performanceData = () => {
    return new Promise(async(resolve, reject) => {
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        // CPU Information
        const CPUS = os.cpus();
        const cpuModel = CPUS[0].model;
        const coreNumber = CPUS.length;
        const cpuSpeed = CPUS[0].speed;
        const cpuLoad = getCpuLoad();
        // Memory Information
        const systemUptime = os.uptime();
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = Math.floor(usedMemory/totalMemory*100)/100;
        resolve({
            osType,
            cpuModel,
            coreNumber,
            cpuSpeed,
            cpuLoad,
            systemUptime,
            freeMemory, 
            totalMemory,
            usedMemory,
            memoryUsage,
        })
    });
};

const cpuAvg = () => {
    const CPUS = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    CPUS.forEach((core) => {
        for(type in core.times) {
            totalMs += core.times[type];
        }
        idleMs += core.times.idle;
    })
    return { 
        idle: idleMs / CPUS.length,
        total: totalMs / CPUS.length,
    };
};

const getCpuLoad = () => {
    return new Promise((resolve, reject) => {
        const start = cpuAvg();
        setTimeout(() => {
            const end = cpuAvg();
            const idleDiff = end.idle - start.idle;
            const totalDiff = end.total - start.total;
            const perctCpu = 100 - Math.floor(100 * idleDiff / totalDiff);
            resolve(perctCpu);
        }, 1000);
    })
};

performanceData().then((data) => {
    console.log(data)
});