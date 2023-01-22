const express = require("express") ;
const productRoute = express.Router() ;
const { ProductModel } = require("../models/productModel") ;

productRoute.get("/" , async (req , res)=>{

    const search = req.query ;  
    try{
        const product = await ProductModel.find(search) ;
        if(product){
            res.send(product) ;
        }else{
            res.send({"msg" : "product not found"})
        }

    }catch(err){
            res.send({"msg" : err})
    }
}) ;



// getting data by sorting ==> ascending 
productRoute.get("/asc" , async (req , res)=>{

    try{

        //using aggregate to sort the price
        const product = await ProductModel.aggregate([{ $sort : { "price" : 1 } }]) ;
            res.send(product) ;
    
    }catch(err){
            res.send({"msg" : err})
    }
}) ;


// getting data by sorting ==> ascending 
productRoute.get("/dec" , async (req , res)=>{

    try{

        //using aggregate to sort the price
        const product = await ProductModel.aggregate([{ $sort : { "price" : -1 } }]) ;
            res.send(product) ;
    
    }catch(err){
            res.send({"msg" : err})
    }
}) ;


// adding products
productRoute.post("/add" , async (req , res)=>{

    // catching data from frontend
    const { title , img , price , description , category , location } = req.body ;

        try{
                // adding to db 
                const product = new ProductModel({title , img , price ,description , category , location }) ;
                await product.save() ;
                res.send({"msg" : `${title} added`}) ;
 
         }catch(err){ 
            res.send({"msg":err}) ;
        }

})

module.exports = { productRoute } ;