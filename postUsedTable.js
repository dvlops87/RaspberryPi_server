//주문 시 테이블을 사용 중 으로 표시
//일단은 테이블 하나만 시연을 하기 때문에 하나만 만듦
//그래서 우리는 1번 테이블로 가정

//아래는 usedTable의 값
//1번 테이블의 정보 = [0]:예약 여부, [1]:사용 여부
//2번 테이블의 정보 = [2]:예약 여부, [3]:사용 여부
//3번 테이블의 정보 = [4]:예약 여부, [4]:사용 여부 등등 6번 테이블까지 존재. 총 길이는 12

//서버의 정보를 읽어온 내용을 수정 후 로컬 파일(usedTableLocal.txt)로 저장 및 서버로 전송
//로컬 파일에는 항상 최신화된 예약 및 사용 상태가 저장됨

//사용기기 : 테이블


var shell = require('shelljs');
var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');
var request = require('request');

fs.readFile('usedTableServer.txt', 'utf8', function (err, data) {
  var data1 = data.substr(0,1);
  var data2 = data.substr(2,10);
  var data3 = data1+'1'+data2;
  fs.writeFile('usedTableLocal.txt', data3, function(err, result) {
    var options = {
      'method': 'POST',
      'url': 'http://203.253.128.177:7579/Mobius/IP-team06/usedTable',
      'headers': {
        'Accept': 'application/json',
        'X-M2M-RI': '12345',
        'X-M2M-Origin': 'SURatAPcSaRq',
        'Content-Type': 'application/vnd.onem2m-res+json; ty=4'
      },
      body: '{\n    "m2m:cin": {\n        "con": "'+data3+'"\n    }\n}'
      
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    
    if(err) console.log('error', err);
  });
  });