var fs = require('fs').promises;
var util = require('util');
const path = require('path');

let projectDir = '';
try {
    projectDir = path.dirname(require.main.filename);
} catch (error) {}
let logDir = projectDir + '/';
let currentDate = new Date()
let currentDateTxt = currentDate.toISOString().split('T')[0];
if (!fileExists(logDir)){ fs.mkdir(logDir); }
let log_file = false;
async function setLogName(name=currentDateTxt+"-"+Date.now()+'.log'){
    //check if name includes a file extension
    if(name.includes('.')){
        log_file = logDir+name;
    }else{
        log_file = logDir+name+'.log';
    }
}
async function setLogDir(dir, relative = true){
    if(relative){dir = projectDir + '/' + dir;}
    if (!fileExists(dir)){ fs.mkdir(dir, { recursive: true }); }
    if(!dir.endsWith('/')){dir += '/';}
    logDir = dir;
    setLogName();
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
    appendToFile(log_file, await logFormatBW(...txt) + '\n');
}
async function appendToFile(filePath, data) {
    try {
        if (!fileExists(filePath)){ await fs.writeFile(filePath, ''); }
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
async function sleep(ms, silent=false) {
    if(ms>999 && !silent){
        await textlog('Sleeping for '+ parseInt(ms/1000).toString() +' Seconds 💤');
    }
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

module.exports = {setLogName,setLogDir,textlog,debuglog,sleep, delay: sleep};