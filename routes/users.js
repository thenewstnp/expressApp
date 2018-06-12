var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongonClient = mongodb.MongoClient;

var resJson;
var url = "mongodb://localhost:27017/userInfo";

router.use(function (req, res, next) {
  resJson = {
    code: 0,
    message: ""
  }
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**用户注册 */
router.post('/register', function (req, res, next) {
  var username = req.body.username;

  var password = req.body.password;

  var repassword = req.body.repassword;

  if (username == "" || password == "" || repassword == "") {

    resJson.code = 1;

    resJson.message = "用户名或密码不能为空，请重新输入！！";

    res.json(resJson);

    return;

  }

  if (repassword != password) {

    resJson.code = 2;

    resJson.message = "两次密码输入不一致，请重新输入！！";

    res.json(resJson);

    return;

  }

  var user = {
    username: username,
    password: password
  }

  var username = {
    username: username
  }

  mongonClient.connect(url, function (err, db) {

    if (err) {
      throw err;
    }

    console.log("数据库连接成功");

    var dataBase = db.db("userInfo");

    dataBase.collection("user").findOne(username, function (err, result) {
      if (err) {
        throw err;
      }

      // console.log(result);

      if (result) {

        resJson.code = 3;

        resJson.message = "用户名已存在，请重新输入！！";

        res.json(resJson);

        return;

      }

      dataBase.collection("user").insertOne(user, function (err) {

        if (err) {
          throw err;
        }

        resJson.code = 0;

        resJson.message = "注册成功！！";

        res.json(resJson);

        db.close();

      });

    });

  });

});


/**用户登录 */
router.post("/login", function (req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  if (username == "" || password == "") {

    resJson.code = 1;

    resJson.message = "用户名或密码不能为空，请重新输入！！";

    res.json(resJson);

    return;

  }

  var userInfo = {
    username: username,
    password: password
  }

  mongonClient.connect(url, function (err, db) {

    if (err) {
      throw err;
    }

    console.log("数据库连接成功");

    var dataBase = db.db("userInfo");

    dataBase.collection("user").findOne(userInfo, function (err, newUserInfo) {

      // console.log(newUserInfo);

      if (err) {
        throw err;
      }

      if (!newUserInfo) {

        resJson.code = 2;

        resJson.message = "用户名或密码错误，请重新输入！！";

        res.json(resJson);

        return;

      }

      if (newUserInfo) {

        resJson.code = 0;

        resJson.message = "登录成功！！";

        res.json(resJson);

        db.close();

      }

    });

  });

});

module.exports = router;
