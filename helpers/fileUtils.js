const fs = require('fs');
//const util = require('util');

// const readFromFile = util.promisify(fs.readFile);
const readFromFile = (destination) => 
    new Promise((resolve, reject)=> {
    fs.readFile(destination, 'utf-8', (err, data) =>{
        if(err){
            reject('File does not exists');
        } else {
            resolve(data);
        }
    });
});

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.log(err) : console.info('File write sucessful!'))
}

const readAndAppend = (destination, content) => {
    fs.readFile(destination, 'utf-8', (err, data) =>{
        if(err){
            console.error(err);
        } else {
            const temp = JSON.parse(data);
            temp.push(content);
            writeToFile(destination, temp);
        }
    });
}

module.exports = { readFromFile, writeToFile, readAndAppend };