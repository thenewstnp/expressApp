var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页',script:"/javascripts/app/index.js"});
});

/**注册 */
router.get('/register', function(req,res,next) {
  res.render('reg', {title: '用户注册',script:"/javascripts/app/reg.js"});
})

/**登录 */
router.get('/login', function(req,res,next) {
  res.render('login', {title: '用户登录',script:"/javascripts/app/login.js"});
})

module.exports = router;
