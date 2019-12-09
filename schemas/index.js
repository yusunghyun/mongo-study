const mongoose = require('mongoose');
const connect = () => {
  mongoose.connect("mongodb://sunghyun:000000@localhost:15000/admin",{
    dbName: "sunghyun"
  },(err)=>{
    if(err) console.err("몽고디비 연결 오류",err);
    else console.log("몽고디비 연결 성공");
  })
}
module.exports = ()=> { //app.js 에서 끌어오면서 실행까지 즉 컨넥트까지 실행!
  connect(); 

  mongoose.connection.on("error",(err)=>{
    console.error("MongooseERROR",err);
  })
  //서버가 죽으면 !
  mongoose.connection.on("disconnected",()=>{
    console.error("MongooseDISCONNECTION");
    connect();
  });

}