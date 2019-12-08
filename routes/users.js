var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/* GET users listing. */
router.get("/",(req,res,next)=>{
  let userLists = {};
  User.find({})
  .then((result)=>{
    userLists=result;
    res.render("save.pug",{title:"회원가입",userLists})
  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/li/:id', function(req, res, next) {
  User.find({
    _id:req.params.id
  })
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/rv/:id',(req,res,next)=>{
  let id = req.params.id;
  (async()=>{
    try{
      let result = await User.remove({_id:id});
      res.redirect('/users');
  }
    catch(err){
      next(err)
    }
  })()
})

router.post('/chg',(req,res,next)=>{
  let _id = req.body._id;
  let userid = req.body.userid;
  let username = req.body.username;
  User.update({
    _id
  },{
    userid,username
  })
  .then((result)=>{
    if(result.ok) res.redirect("/users");
    else {
      res.send(`
      <meta charset="utf-8">
      <script>
      alert('데이터 수정에 실패하였습니다')
      location.href="/users";
      </script>`);
    }
  })
  .catch((err)=>{
    next(err)
  })

})

router.post('/', function(req, res, next) { //pug에서 action=users와method=post작동하면 여기실행
  const user = new User({
    username: req.body.username,
    userid: req.body.userid
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
