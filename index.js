var fs = require('fs').promises;
var util = require('util');

let logDir = __dirname + '/';
let currentDate = new Date()
let currentDateTxt = currentDate.toISOString().split('T')[0];
if (!fileExists(logDir)){ fs.mkdir(logDir); }
let log_file = false;
const default_log_file = logDir+currentDateTxt+"-"+Date.now()+'.log'; 
async function setLogName(name){
    //check if name includes a file extension
    if(name.includes('.')){
        log_file = logDir+name;
    }else{
        log_file = logDir+name+'.log';
    }


}
async function setLogDir(dir, relative = true){
    if(relative){dir = __dirname + '/' + dir;}
    if (!fileExists(dir)){ fs.mkdir(dir, { recursive: true }); }
    logDir = dir;
}
async function currentDateTime(){
    const date = new Date();
    let day = date.getDate();
    if(day<10){day='0'+day;}
    let month = date.getMonth() + 1;
    if(month<10){month='0'+month;}
    let year = date.getFullYear();
    let hour = date.getHours();
    if(hour<10){hour='0'+hour;}
    let minutes = date.getMinutes();
    if(minutes<10){minutes='0'+minutes;}
    let seconds = date.getSeconds();
    if(seconds<10){seconds='0'+seconds;}
    let ms = date.getMilliseconds();
    if(ms<10){ms='00'+ms;}else if(ms<100){ms='0'+ms;}
    return `${day}-${month}-${year} ${hour}:${minutes}:${seconds}:${ms} :`;
}
async function logFormat(...txt){
    let logOutput = util.format(await currentDateTime()) + ' ';
    for (const arg of txt) {
        logOutput += util.inspect(arg, { showHidden: false, depth: null, colors: true }) + ' ';
    }
    return logOutput.trim();
}
async function logFormatBW(...txt){
    let logOutput = util.format(await currentDateTime()) + ' ';
    for (const arg of txt) {
        logOutput += util.inspect(arg, { showHidden: false, depth: null, colors: false }) + ' ';
    }
    return logOutput.trim();
}
async function textlog(...txt){
    console.log(await logFormat(...txt));
    await debuglog(...txt);
}
async function debuglog(...txt){
    let isFileExists = await fileExists(log_file);
    if(!isFileExists)log_file = default_log_file;
    appendToFile(log_file, await logFormatBW(...txt) + '\n');
}
async function appendToFile(filePath, data) {
    try {
        await fs.appendFile(filePath, data);
    } catch (error) {
        console.error('Error appending to file', error);
    }
}
async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {setLogName,setLogDir,textlog,debuglog};