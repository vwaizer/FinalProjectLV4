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
            const result=await databaseProject.receipt.findOne({userID:new ObjectId(`${req.params.receiptID}`)})
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
    console.log(req.userID);
    const userCart=await databaseProject.receipt.findOne({userID:(req.userID)})
    console.log(userCart);
    if(userCart==null){
        const receipt=new Receipt({userID:req.userID.valueOf(),date:new Date(),cart:[{amount:1,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)}]})
        const result=await databaseProject.receipt.insertOne(receipt)
        res.json(result)
    }
    else{
        const newCart=userCart.cart.push({amount:1,discount:bookData.discount,price:bookData.price,bookID:new ObjectId(bookID)})
        const result=await databaseProject.receipt.insertOne({userID:new ObjectId(req.userID)},{cart:newCart})
        return res.json({message:"Success",result:result})
    }
   
   } catch (error) {
        return next(error)
   }

}