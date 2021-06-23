//ArrivalTable의 값을 받아와서 arrivalTableServer.txt에 저장합니다.
//도착 정보를 받아냄.
//사용기기 : 테이블
//텍스트 내용은 000000 6자리로 이뤄져있으며 손님이 도착시 1을 반환한다.


//초기 실행시 arrivalTableServer.txt를 생성 후 실행해주세요

var data1 = '';
var data2 = '';

var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');
var request = require('request');

fs.readFile('arrivalTableServer.txt', 'utf8', function (err, data) {// 리셋시켜서 서버에 전송한다.
  if (data.charAt[0] == '1'){
    data1 = data.substring(1);
    data2 = data1+'0';
  } else if (data.charAt[1] == '1') {
    data1 = data.substring(2);
    data2 = data.substring(0,1)+'0' + data1;
  } else if (data.charAt[2] == '1') {
    data1 = data.substring(3);
    data2 = data.substring(0,2)+'0' + data1;
  } else if (data.charAt[3] == '1') {
    data1 = data.substring(4);
    data2 = data.substring(0,3) +'0'+ data1;
  } else if (data.charAt[4] == '1') {
    data1 = data.substring(5);
    data2 =  data.substring(0,4) +'0'+ data1;
  } else if (data.charAt[5] == '1') {
    data1 = data.substring(0,5);
    data2 = data1+'0';
  } else {
    data2 = data;
  }
  fs.writeFile('arrivalTableLocal.txt', data2, function(err, result) {
      var options = {
        'method': 'POST',
        'url': 'http://203.253.128.177:7579/Mobius/IP-team06/arrivalTable',
        'headers': {
          'Accept': 'application/json',
          'X-M2M-RI': '12345',
          'X-M2M-Origin': 'SURatAPcSaRq',
          'Content-Type': 'application/vnd.onem2m-res+json; ty=4'
        },
        body: '{\n    "m2m:cin": {\n        "con": "'+data2+'"\n    }\n}'
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
      if(err) console.log('error', err);
  });
 });