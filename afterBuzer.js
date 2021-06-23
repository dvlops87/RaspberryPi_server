//서버에서 값을 받아 부저를 켜는 파일
//사용 기기 : 테이블

  var options = {
    'method': 'POST',
    'url': 'http://203.253.128.177:7579/Mobius/IP-team06/cookedTable01',
    'headers': {
      'Accept': 'application/json',
      'X-M2M-RI': '12345',
      'X-M2M-Origin': 'SURatAPcSaRq',
      'Content-Type': 'application/vnd.onem2m-res+json; ty=4'
    },
    body: '{\n    "m2m:cin": {\n        "con": "0"\n    }\n}'
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  //부저 실행