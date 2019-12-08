var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = new User({
    username: "홍삼",
    userid: "ho"
  });
  //user.save()까보면 프라미스임!
  user.save()
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    next(err);
  })
});



module.exports = router;
