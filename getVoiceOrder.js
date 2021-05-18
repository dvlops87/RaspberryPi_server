var shell = require('shelljs');
var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');

var createlog = shell.exec('node app-4.js');
var getcinnumber = shell.exec('node app-6.js > cin.txt');

fs.readFile('cin.txt', 'utf8', function (err, data) {
  cinlist = data.split(',');
  concentence = cinlist[10].replace(/\"/g,''); 
  concentence = concentence.replace(/con/g,''); 
  concentence = concentence.replace(/\:/g,''); 
  concentence = concentence.replace(/\}/g,''); 
  con = concentence.replace(/\s/g,''); // 문자열 내 공백 제거
  fs.writeFile('conResult.txt', con, function(err, result) {
    if(err) console.log('error', err);
  });
 });