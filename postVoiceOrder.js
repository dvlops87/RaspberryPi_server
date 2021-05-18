// 음성인식 텍스트 파일 > 서버
//서버로 텍스트에서 추출한 값 보내는 파일

var request = require('request');
process.stdin.setEncoding('utf8')
var fs = require('fs');
var util = require('util');


fs.readFile('example.txt', 'utf8', function (err, data) {
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://203.253.128.177:7579/Mobius/test20175107/textfromRPi',
  'headers': {
    'Accept': 'application/json',
    'X-M2M-RI': '12345',
    'X-M2M-Origin': 'SNWUC2k4zw2',
    'Content-Type': 'application/vnd.onem2m-res+json; ty=4'
  },
  body: '{\n    "m2m:cin": {\n        "con": "'+data+'"\n    }\n}'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

  fs.writeFile('posetResult.txt', data, function(err, result) {
    if(err) console.log('error', err);
  });
 });