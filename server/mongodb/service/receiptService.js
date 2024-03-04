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
            getAllReceipt()
        }
    } catch (error) {
        next(error)
    }
}