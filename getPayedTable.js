//payedTable의 값을 받아와서 payedTableServer.txt에 저장합니다.
//사용 기기 : 포스기

var shell = require('shelljs');
var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://203.253.128.177:7579/Mobius/IP-team06/payedTable/la',
  'headers': {
    'Accept': 'application/json',
    'X-M2M-RI': '12345',
    'X-M2M-Origin': 'SOrigin'
  }
};
request(options, function (error, response) {
    cinlist = response.body.split(',');
    concentence = cinlist[10].replace(/\"/g,''); 
    concentence = concentence.replace(/con/g,''); 
    concentence = concentence.replace(/\:/g,''); 
    concentence = concentence.replace(/\}/g,''); 
    fs.writeFile('payedTableServer.txt', concentence, function(err, result) {
        if(err) console.log('error', err);
    });
    if (error) throw new Error(error);
    console.log(response.body);
});
