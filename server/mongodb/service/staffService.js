import databaseProject from "../GetDataBase.js"
import { registerService } from "./registerService.js"


export const getHiredBook=async(req,res)=>{
    const result =await databaseProject.hiredBook.find().toArray()
    return res.json(result)
}
export const putHiredBook=async (req,res)=>{
    const caseID=req.params.ID;
    const status=req.body.status;
    const result=await databaseProject.hiredBook.updateOne({_id:new ObjectId(`${caseID}`)},status)
    return res.json(result)
}
export const accounting=async(req,res)=>{

}
export const createStaff=async(req,res)=>{
    
    const result = await registerService.register(req.body);
   if(result.accessToken){
     return res.json("Success")
   }
   else{
    return res.json("Error")
   }
}
export const getOverall= async(req,res,next)=>{
 
 try {
    const bookNumber=(await databaseProject.book.find().toArray()).length
    const userNumber=(await databaseProject.users.find().toArray()).length
    const receiptNumber=(await databaseProject.receipt.find().toArray()).length
    return res.json({bookNumber:bookNumber,userNumber:userNumber,receiptNumber:receiptNumber})
 } catch (error) {
    next(error)
 }
}
export const getAllStaff=async(req,res,next)=>{
    try {
        const result=await databaseProject.users.find({role:"staff"}).toArray()
        return res.json(result)
    } catch (error) {
        next(error)
    }
}