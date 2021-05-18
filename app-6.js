#!/usr/bin/env node
process.stdin.setEncoding('utf8')
var util = require('util');
var shell = require('shelljs');
var fs = require('fs');
var origindata = 'origin';

fs.readFile('log.txt', 'utf8', function (err, data) {
  logArray = data.split(',');
  var data1 = logArray[1];
  logArray2 = data1.split('/');
  var data2 = logArray2[3];
  cuttext2 = data2.substr(0,19);
  origindata = cuttext2;
  if(err) console.log('error', err);
  // 리스트로 저장된 파일 중 최신의 cin의 값 받아오기 
  
  var url = 'http://203.253.128.177:7579/Mobius/test20175107/textfromRPi/' + origindata;
  
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
      'Accept': 'application/json',
      'X-M2M-RI': '12345',
      'X-M2M-Origin': 'SOrigin'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
  
});
