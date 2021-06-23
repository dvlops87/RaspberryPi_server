//QR결제 시 포스기에서 중복 결제를 방지하기 위해 설정
//일단은 테이블 하나만 시연을 하기 때문에 하나만 만듦
//그래서 우리는 1번 테이블로 가정
//테이블 별 결제 상황은 payedTableServer.txt에서 확인 가능

//아래는 payedTableServer의 값, QR결제시 1로 바뀜
//1번 테이블의 정보 = [0]:결제 여부
//2번 테이블의 정보 = [1]:결제 여부
//3번 테이블의 정보 = [2]:결제 여부 등등 6번 테이블까지 존재. 총 길이는 6

//사용기기 : 테이블

var shell = require('shelljs');
var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');
var request = require('request');

fs.readFile('payedTableServer.txt', 'utf8', function (err, data) {
    var data1 = data.substr(1,5);
    var data2 = '1'+data1;
    fs.writeFile('payedTableLocal.txt', data2, function(err, result) {
        var options = {
          'method': 'POST',
          'url': 'http://203.253.128.177:7579/Mobius/IP-team06/payedTable',
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
   