import databaseProject from "../GetDataBase.js"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../schema/Schema.js";
export const getUser=async (req,res)=>{
    const userID=req.params.ID;

    const user=await databaseProject.users.findOne({_id:userID} )
    return res.json(user);
}
export const deleteUser=async(req,res)=>{
  const userID=req.params.ID;

    const result=await databaseProject.users.deleteOne({_id:userID} )
    return res.json(result);
}
export const addUser=async(req,res)=>{
    const newUser=new User(req.body)
    const result= await databaseProject.users.insertOne(newUser);
    return res.json(result)
}
export const updateUser=async (req,res)=>{
  const userID=req.params.ID;
  const result=await databaseProject.users.updateOne({_id:userID},req.body)
  return res.json(result)
}
export const getAllUser=async (req,res)=>{
  const result=await databaseProject.users.find().toArray()
  return res.json(result)
}

