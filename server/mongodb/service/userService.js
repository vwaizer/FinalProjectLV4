import { ObjectId } from "mongodb";
import { User } from "../../schema/Schema.js";
import databaseProject from "../GetDataBase.js";
export const getDetailUser=async (req,res,next)=>{
  console.log("vao getDetailUser");
    const userID=req.userID;
    console.log(userID);
    try {
      const user=await databaseProject.users.findOne({_id:new ObjectId(`${userID}`)} )
    return res.json(user);
    } catch (error) {
      next(error)
    }
    
    
}
export const deleteUser=async(req,res,next)=>{
   try {
    const userID=req.userID;

    const result=await databaseProject.users.deleteOne({_id:new ObjectId(`${userID}`)} )
    return res.json(result);
   } catch (error) {
    next(error)
   }
}
export const addUser=async(req,res,next)=>{
    try {
      const newUser=new User(req.body)
    
    const result= await databaseProject.users.insertOne(newUser);
    return res.json(result)
    } catch (error) {
      next(error)
    }
}
export const updateUser=async (req,res,next)=>{
  try {
    const userID=req.userID;
  const result=await databaseProject.users.updateOne({_id:new ObjectId(`${userID}`)},req.body)
  return res.json(result)
  } catch (error) {
    next(error)
  }
}
export const getAllUser=async (req,res,next)=>{
  try {
    const result=await databaseProject.users.find().toArray()
  return res.json(result)
  } catch (error) {
    next(error)
  }
}

