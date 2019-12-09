var express = require('express');
var router = express.Router();
var User = require('../schemas/user'); //몽구스의 Schema로 만든 거임!

/* GET users listing. */
router.get("/",async(req,res,next)=>{ //Read
  let userLists = {};
  try{
    let result = await User.find({});
    userLists=result;
    userLists.reverse();//역순인데 리렌더링?할때마다 userList는 정순으로 쌔거니까 리렌더링할때만 바꿔서 pug로 보내주는 격.
    res.render("save.pug",{title:"회원가입",userLists})
  }
  catch(err){
    next(err)
  }
})

router.get('/li/:id', async (req, res, next)=> {
  try{
    let result = await User.find({_id:req.params.id});
    res.json(result);
  }
  catch(err){
    next(err);
  }
});


router.get('/rv/:id',async(req,res,next)=>{
  let id = req.params.id;
  try{
    await User.remove({_id:id});
    res.redirect('/users');
  }
  catch(err){
    next(err)
  }
  
})

router.post('/chg',async(req,res,next)=>{
  let _id = req.body._id;
  let userid = req.body.userid;
  let username = req.body.username;
  try{
    let result = await User.update({_id},{userid,username});
    if(result.ok) res.redirect("/users");
    else{
      res.send(`
      <meta charset="utf-8">
      <script>
      alert('데이터 수정에 실패하였습니다')
      location.href="/users";
      </script>`);
    }
  }
  catch(err){
    next(err)
  }

})

router.post('/', function(req, res, next) { //pug에서 action=users와method=post작동하면 여기실행
  const user = new User({
    username: req.body.username,
    userid: req.body.userid
  });
  //user.save()까보면 프라미스임!
  user.save()
  .then((result)=>{
    res.redirect('/users');
  })
  .catch((err)=>{
    next(err);
  })
});



module.exports = router;
