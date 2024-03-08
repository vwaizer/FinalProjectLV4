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
    ;
    const result = await registerService.register(req.body);
   if(result.accessToken){
     return res.json("Success")
   }
   else{
    return res.json("Error")
   }
}