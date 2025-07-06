const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:String,
    email:String
    // age:Number
})
const UserModel=mongoose.model("users",UserSchema)
module.exports=UserModel

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });

// module.exports = mongoose.model("users", UserSchema);
