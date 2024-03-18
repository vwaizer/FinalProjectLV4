import { Receipt } from "../../schema/Schema.js";
import databaseProject from "../GetDataBase.js"
import {ObjectId} from "mongodb";
export const getAllReceipt=async(req,res,next)=>{
    try {
        const result=await databaseProject.receipt.find().toArray()
        return res.json(result)
    } catch (error) {
        next(error)
    }
}
export const getFilterReceipt=async(req,res,next)=>{
    try {
        if(req.userID.valueOf()){
            const result=await databaseProject.receipt.aggregate([
                {
                  '$match': {
                    'userID': new ObjectId(`${req.userID.valueOf()}`)
                  }
                }, {
                  '$lookup': {
                    'from': 'books', 
                    'localField': 'cart.bookID', 
                    'foreignField': '_id', 
                    'as': 'result'
                  }
                }
              ]).toArray()
              console.log(result[0]);
              const resItem=result[0].cart.map((item,index)=>{return {...item,img:result[0].result[index].images[0]}}
              )
            return res.json(resItem)
        }
       
    } catch (error) {
        next(error)
    }
}
export const addToCart=async(req,res,next)=>{
   try {
    const bookID=req.params.ID;
    const amount=req.body.amount?req.body.amount:1;
    console.log("amount",amount);
    const bookData=await databaseProject.book.findOne({_id:new ObjectId(bookID)})
    console.log(req.userID.valueOf());
    const userCart=await databaseProject.receipt.findOne({userID:(req.userID),status:"In Cart"})
    console.log("userCart",userCart);
    if(userCart==null){
        const receipt=new Receipt({userID:req.userID,date:new Date(),status:"In Cart",cart:[{amount:amount,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)}]})
        const result=await databaseProject.receipt.insertOne(receipt)
        res.json(result)
    }
    else{
        const bookItem=userCart.cart.find((item,index)=>item.bookID==bookID)
        if(bookItem)
        {   
            bookItem.amount+=amount
            const index= userCart.cart.indexOf(bookItem)
            userCart.cart[index]=bookItem
            const result=await databaseProject.receipt.updateOne({userID:(req.userID),status:"In Cart"},{$set:{cart:userCart.cart}})
        return res.json({message:"Success",result:result})
        }
        userCart.cart.push({amount:amount,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)})
        console.log(userCart);
        const result=await databaseProject.receipt.updateOne({userID:(req.userID),status:"In Cart"},{$set:{cart:userCart.cart}})
        return res.json({message:"Success",result:result})
    }
   
   } catch (error) {
        return next(error)
   }

}