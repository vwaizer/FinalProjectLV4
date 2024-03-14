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
        if(req.params.userID){
            const result=await databaseProject.receipt.find({userID:new ObjectId(`${req.params.userID}`)}).toArray()
            return res.json(result)
        }
        else{
            getAllReceipt(req,res,next)
        }
    } catch (error) {
        next(error)
    }
}
export const addToCart=async(req,res,next)=>{
   try {
    const bookID=req.params.ID;
    const bookData=await databaseProject.book.findOne({_id:new ObjectId(bookID)})
    console.log(req.userID.valueOf());
    const userCart=await databaseProject.receipt.findOne({userID:(req.userID),status:"In Cart"})
    console.log("userCart",userCart);
    if(userCart==null){
        const receipt=new Receipt({userID:req.userID,date:new Date(),status:"In Cart",cart:[{amount:1,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)}]})
        const result=await databaseProject.receipt.insertOne(receipt)
        res.json(result)
    }
    else{

        const newCart=userCart.cart.push({amount:1,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)})
        console.log(userCart);
        const result=await databaseProject.receipt.updateOne({userID:(req.userID),status:"In Cart"},{$set:{cart:userCart.cart}})
        return res.json({message:"Success",result:result})
    }
   
   } catch (error) {
        return next(error)
   }

}