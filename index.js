const express = require("express") ;
const cors = require("cors") ;
require("dotenv").config() ;
const { connection } = require("./configs/db") ;
const { userRoute  } = require("./routes/userRoute") ;
const { productRoute } = require("./routes/productRoute") ;
const { authentication } = require("./midddlewares/authMiddleware") ;

const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;
app.get("/" , async (req ,res)=>{
    res.send("Welcome to MyAbode") ;
}) ;

app.use( "/users" , userRoute ) ;
app.use("/products" , productRoute ) ;
app.use( authentication ) ;


app.listen(process.env.port , async ()=>{

    try{
         await connection ;
         console.log("connect to <<< DB >>>") ;
    }catch(err){
        console.log("Not able to connect with DB") ;
    }
    console.log(`server running at port <<< ${process.env.port} >>>` ) ;
})