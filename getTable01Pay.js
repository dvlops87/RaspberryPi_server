//포스기에서 테이블 별 결제 현황을 받음
//받은 메뉴는 table01Menu.txt 에 저장되고 받은 결제 현황은 table01Pay.txt 에 저장된다.
//사용 기기 : 1번 테이블, 포스기

var shell = require('shelljs');
var fs = require('fs');
process.stdin.setEncoding('utf8')
var util = require('util');

  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'http://203.253.128.177:7579/Mobius/IP-team06/payedTable/la', // 메뉴 받기
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
      con = concentence.replace(/\s/g,''); // 문자열 내 공백 제거
      con = con.substr(0,1)
      fs.writeFile('table01Pay.txt', con, function(err, result) {
        if(err) console.log('error', err);
      });
      if (error) throw new Error(error);
      console.log(response.body);
  });

