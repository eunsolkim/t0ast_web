var express = require('express'); //Express 객체 생성
var router = express.Router();    //Middleware, Routing system, 라우터 모듈, 기본 앱의 경로에 라우터 모듈을 마운트

var client = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', (req, res) => {
  //callback function : second parameter will contain the initialized db object
  client.connect('mongodb://localhost:27017/test', (error, db) => {
    if(error) console.log(error);
    else {
      var total_num, name;
      //DB에 존재하는 데이터들의 총 갯수 출력
      var db2 = db.db('test');
      db2.collection('current').count({}, (err, number) => {
        if(err) throw err;
        //console.log('==== Total number is ' + number + '.');
        total_num = number;
      });

      //DB내용 전체 출력
      db2.collection('current').find({}, {}).toArray((err, result) => {
        if(err) throw err;
        for(var i = 0; result[i] != null; ++i)  {
          //console.log(result[i]);
        }
        name = result[0]['Name'];
        res.render('index', { title: name, num: total_num });
      });
      db.close();
    }
  });
});

router.get("/getRow", (req, res) => {
  client.connect('mongodb://localhost:27017/test', (error, db) => {
    if(error) console.log(error);
    else {
      db2 = db.db('test');
      //DB에 존재하는 데이터들의 총 갯수 출력
      db2.collection('current').count({}, (err, number) => {
        if(err) throw err;
        //console.log('==== Total number is ' + number + '.');
        var total_num = number;
      });



      // 데이터 내용 모두 출력
      db2.collection('current').find({}, {}).toArray((err, result) => {
          if(err) throw err;
          for(var i = 0; result[i] != null; ++i)  {
              //console.log(result[i]);
          }
          res.send({'result':result});
      });
      db.close();
    }
  });
});

router.get('/search', )

module.exports = router;
