import databaseProject from "../GetDataBase.js"

export const getAllReceipt=async(req,res)=>{
    const result=await databaseProject.receipt.find().toArray()
    return res.json(result)
}
export const getHiredBook=async(req,res)=>{
    const result =await databaseProject.hiredBook.find().toArray()
    return res.json(result)
}
export const putHiredBook=async (req,res)=>{
    const caseID=req.params.ID;
    const status=req.body.status;
    const result=await databaseProject.hiredBook.updateOne({_id:caseID},status)
    return res.json(result)
}
export const accounting=async(req,res)=>{

}