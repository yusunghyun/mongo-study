const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
  userid:{
    type:String,
    required:true,//꼭입력
    unique:true//고유값
  },
  username:{
    type:String,
    required:true,
  },
  createAt:{
    type:Date,
    default:Date.now(),
  }
});

module.exports = mongoose.model("User",userSchema); // 몽구스의 Schema로 만든 userSchema를 User라는 이름으로 배출