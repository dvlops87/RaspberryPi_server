//ArrivalTable의 값을 받아와서 arrivalTableServer.txt에 저장합니다.
//도착 정보를 받아냄.
//사용기기 : 테이블
//텍스트 내용은 000000 6자리로 이뤄져있으며 손님이 도착시 1을 반환한다.


//초기 실행시 arrivalTableServer.txt를 생성 후 실행해주세요

var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://203.253.128.177:7579/Mobius/IP-team06/arrivalTable/la',
  'headers': {
    'Accept': 'application/json',
    'X-M2M-RI': '12345',
    'X-M2M-Origin': 'SOrigin'
  }
};
request(options, function (error, response) { // 서버에서 도착 정보를 받아온다.
    cinlist = response.body.split(',');
    concentence = cinlist[10].replace(/\"/g,''); 
    concentence = concentence.replace(/con/g,''); 
    concentence = concentence.replace(/\:/g,''); 
    concentence = concentence.replace(/\}/g,''); 
    fs.writeFile('arrivalTableServer.txt', concentence, function(err, result) {
        if(err) console.log('error', err);
    });
    if (error) throw new Error(error);
    console.log(response.body);
});