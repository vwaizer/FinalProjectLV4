import databaseProject from "../GetDataBase"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../schema/Schema";
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

const privateKey="abcdef";
export const   createTokenLogin =  (data,privateKey) =>  {
  console.log(data);
  return  new  Promise((resolve, reject) => {
     jwt.sign(
      { username: data.username, password: data.password },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      }
    );
  });
};
export const createLoginAccess= async(req,res)=>{
  
  const encrypt = {username:req.body.username,password: req.body.password };
  
  const token=  await createTokenLogin(encrypt,privateKey);
  return res.json({token});
}