const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    macAddress: String,
    cpuLoad: Number,
    osType: String,
    cpuModel: String,
    coreNumber: Number,
    cpuSpeed: Number,
    systemUptime: Number,
    freeMemory: Number, 
    totalMemory: Number,
    usedMemory: Number,
    memoryUsage: Number,
});

module.exports = mongoose.model('Machine', Machine);