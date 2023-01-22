const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    name : String ,
    email : String ,
    password : String ,
    city : String 
}) ;
const UserModel = mongoose.model("userCollection" , userSchema ) ;

module.exports = { UserModel } ;