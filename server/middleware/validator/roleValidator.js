import jwt from "jsonwebtoken";
import databaseProject from "../../mongodb/GetDataBase.js";
;
const privateKey=process.env.PRIVATE_KEY;
export const checkToken=(privateKey,token)=>{
    return new Promise((resolve,reject)=>{
      const decode=jwt.verify(token,privateKey,(err,token)=>{
        if(err){
          reject(err.message)
        }
        resolve(token);
        
      });
      
    })
  }

export const userValidator = async (req, res, next) => {
    console.log("accessToken",req.body);
    const token = req.body.accessToken;
    
    console.log(token);
    const userUnit= await checkToken(privateKey,token);
    
    // if(result.username== "admin"){
    //   return res.json("success")
    // }
    // else{
    //   return res.json("fail")
    // }
    console.log("userUnit",userUnit);
    const result= await databaseProject.users.findOne({username:userUnit.username});
    console.log(result);
    // req.userEmail=userUnit.email;
    // req.decode=result
    if(result){
      if(result.role=="user"){
        console.log(result._id.valueOf());
        req.userID=result._id.valueOf()
        return next();
      }
      else{
        throw new Error("You do not have permission")
      }
      
    }
    else{
      throw new Error("Access token is wrong")
    }
}

export const staffValidator = async (req, res, next) => {
  console.log("accessToken",req.body);
  const token = req.body.accessToken;
  
  console.log(token);
  const userUnit= await checkToken(privateKey,token);
  
  // if(result.username== "admin"){
  //   return res.json("success")
  // }
  // else{
  //   return res.json("fail")
  // }
  console.log("userUnit",userUnit);
  const result= await databaseProject.users.findOne({username:userUnit.username});
  console.log(result);
  // req.userEmail=userUnit.email;
  // req.decode=result
  if(result){
    if(result.role=="staff"){
      req.staffID=result._id.valueOf()
      return next();
    }
    else{
      throw new Error("You do not have permission")
    }
    
  }
  else{
    throw new Error("Access token is wrong")
  }
}
export const adminValidator = async (req, res, next) => {
  console.log("accessToken",req.body);
  const token = req.body.accessToken;
  
  console.log(token);
  const userUnit= await checkToken(privateKey,token);
  
  // if(result.username== "admin"){
  //   return res.json("success")
  // }
  // else{
  //   return res.json("fail")
  // }
  console.log("userUnit",userUnit);
  const result= await databaseProject.users.findOne({username:userUnit.username});
  console.log(result);
  // req.userEmail=userUnit.email;
  // req.decode=result
  if(result){
    if(result.role=="admin"){
      return next();
    }
    else{
      throw new Error("You do not have permission")
    }
    
  }
  else{
    throw new Error("Access token is wrong")
  }
}