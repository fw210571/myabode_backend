const express = require("express") ;
const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcrypt") ;
require("dotenv").config() ;
const userRoute = express.Router() ;
const { UserModel } = require("../models/userModel") ;



//getting users from DB
userRoute.get("/" , async (req , res )=>{
    try{
        const users = await UserModel.find() ;
        res.send( users ) ;

    }catch(err){
        res.send({"error" : err })
    }
} )







//signing in user 
userRoute.post("/register" , async (req , res )=>{
     
    const { name , email , password , city} = req.body ;
    const user = await UserModel.findOne({email}) ;

    //checking email is exist already or not 
    if( user ){
        res.send( {"msg" : "Already Signed please Login"}) ;
    }else {
            try{
                //ecrypting the password using bcrypt
                bcrypt.hash( password , 3 , async (err , password)=>{
                    if( err ){
                    res.send( {"msg" : "Error in ecrypting the data"} ) ;
                    }else {
                    // saving user data at database 
                        const payload = new UserModel({name , email , password , city }) ;
                        await payload.save() ;
                        res.send( {"msg" : `${name} signed successfully`} ) ;
                    }
                } )
            }catch(err){
                res.send({"error from register" : err }) ;
            }
        
    }

})


//login user 
userRoute.post("/login" , async (req , res)=>{

      const {email , password } = req.body ;
      const user = await UserModel.findOne({email}) ;
      
      //checking user is exist or not 
      if( user ){   
                     //comparing the both password ( User_DB and req_User )
                     try{
                            bcrypt.compare(password , user.password ,  (err , result)=>{
                                if(result){
                                        const token = jwt.sign( { userID : user._id } , process.env.key ) ;
                                      
                                        res.send( {"msg" : "Logged in Successfully" , "token"  : token} ) ;
                                }else {
                                        
                                        res.send({"msg" : "Incorrect password"}) ;
                                }
                            })
                     }catch(err){
                            res.send({"error from login" : err }) ;
                     }
        


      }else {
        res.send({"msg" : "Please first register the email"}) ;

      }
}) ;


//deleting the user by ID
userRoute.delete("/delete/:id" , async (req , res)=>{

    const ID = req.params.id ;

    const user = await UserModel.findOne( {"_id" : ID} ) ;

   if( user ){

        try{

            const updated = await UserModel.findByIdAndDelete({"_id" : ID}) ;
            res.send({"msg" : "user deleted"}) ;

        }catch(err){
            res.send( {"msg" : err } )
        }

    }else {
        res.send({"msg" : "User doesn't exist"}) ;
    }

}) ;



module.exports = { userRoute } ;