import nodemailer from "nodemailer";
import databaseProject from "../GetDataBase.js";
import {ObjectId} from "mongodb"
import express from "express";
const contractMail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lightwing2208@gmail.com",
    pass: "wmnomqnuvabexepw",
  },
});
contractMail.verify((error)=>{
    if(error){
        console.log(error);
        return next(error)
    }
    else{
        console.log("ready to send");
        
    }
})
export const sendMail=async(req,res,next)=>{
  try{
    const caseID=(req.params.ID);
    
    const caseData=await databaseProject.hiredBook.aggregate([
     {
       '$match': {
         '_id':  new ObjectId(`${caseID}`)
       }
     }, {
       '$lookup': {
         'from': 'users', 
         'localField': 'userID', 
         'foreignField': '_id', 
         'as': 'user'
       }
     }, {
       '$lookup': {
         'from': 'books', 
         'localField': 'bookID', 
         'foreignField': '_id', 
         'as': 'book'
       }
     }
   ]).toArray()
    if(caseData.length>0){
     
     const userMail=caseData.user[0].email;
    const bookName=caseData[0].book[0].name;
     const sentMail={
         from:"lightwing2208@gmail.com",
         to:userMail,
         subject:"DEADLINE RETURN BOOK",
         html:`<div>You have return book :${bookName}  </div>`
     }
     contractMail.sendMail(sentMail,(error)=>{
         if(error){
            return res.json(error.message);
         }
         else{
            return res.json("sent")
         }
     })
    }
    
  }
  catch(err){
    return next(err)
  }
   
}
