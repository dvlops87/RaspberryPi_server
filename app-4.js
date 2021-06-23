// 서버 > 라파
// 서버로 텍스트에서 추출한 값을 텍스트 log에 저장
// 사용 기기 : 테이블

var request = require('request');
var util = require('util');
var fs = require('fs');
var logFile = fs.createWriteStream('log.txt', { flags: 'w' });
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

var options = {
  'method': 'GET',
  'url': 'http://203.253.128.177:7579/Mobius/test20175107/textfromRPi?fu=1', //cnt
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
