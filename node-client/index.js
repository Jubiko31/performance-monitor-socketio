require('dotenv').config()
const os = require('os');
const io = require('socket.io-client');
let socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
    console.log('Connected to the socket server 🎉')
    const ni = os.networkInterfaces(); 
    let macAddress;
    for(let key in ni) {
        macAddress = Math.floor(Math.random()*3) + 1;
        break;
        if(!ni[key][0].internal) {
            if(ni[key][0].mac === '00:00:00:00:00:00') {
                macA = Math.random().toString(36).substring(2,15);
            } else {
                macAddress = ni[key][0].mac;
                break;
            }       
        }
    }

    socket.emit('clientAuth', 'bs^yg$hn9^ni25Rcvy69');
   
    performanceData().then((data) => {
        data.macAddress = macAddress;
        socket.emit('initPerfData', data);
    });

    let perfDataInterval = setInterval(() => {
        performanceData().then((data) => {
            data.macAddress = macAddress;
            socket.emit('perfData', data);
        });
    }, 1000);   

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval);
    })
});

const performanceData = () => {
    return new Promise(async(resolve, reject) => {
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        // CPU Information
        const CPUS = os.cpus();
        const cpuModel = CPUS[0].model;
        const coreNumber = CPUS.length;
        const cpuSpeed = CPUS[0].speed;
        const cpuLoad = await getCpuLoad();
        // Memory Information
        const systemUptime = os.uptime();
        const freeMemory = os.freemem();
        const totalMemory = os.totalmem();
        const usedMemory = totalMemory - freeMemory;
        const memoryUsage = Math.floor(usedMemory/totalMemory*100)/100;
        const isActive = true;
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
            isActive,
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
