'use strict';

const fs = require('fs');
const languageFile = './src/assets/languages/en.json';
fs.readFile(languageFile, (err, data) => {  
    if (err) throw err;
    const languageToekens = JSON.parse(data);
    for(var attributename in languageToekens.data){
        languageToekens.data[attributename] = '******************';
        console.log(attributename+": "+languageToekens.data[attributename]);
    }
    let op = JSON.stringify(languageToekens); 
    fs.writeFileSync('./src/assets/languages/star.json', op);  
   // console.log(languageToekens);
});