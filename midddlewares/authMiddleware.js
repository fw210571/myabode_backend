const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;

const authentication = (req , res , next)=>{
   const token = req.headers.authorization ;
   //checking token is there or not 
   if( !token ){
    res.send( {"msg" : "Sorry your token is missing so Login first"}) ;
      
   }else {
  
    //verifying the token then give permission to next route 
    const decoded = jwt.verify(token , process.env.key ) ;
    if( decoded ){
     next() ;
    }else {
     res.send( {"msg" : "Token is wrong"}) ;
    }
   
   }

}

module.exports = { authentication } ;