//서버에서 값을 받아 부저를 켜는 파일
//사용 기기 : 1번 테이블
var request = require('request');
var cin;
var options = {
  'method': 'GET',
  'url': 'http://203.253.128.177:7579/Mobius/IP-team06/cookedTable01/la',
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
    cin = concentence;
    fs.writeFile('cookedTable01.txt', cin, function(err, result) {
      if(err) console.log('error', err);
  });
  if (error) throw new Error(error);
  console.log(response.body);
});








