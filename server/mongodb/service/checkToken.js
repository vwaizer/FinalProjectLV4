import jwt from "jsonwebtoken";


  export const checkToken=(privateKey,token)=>{
    return new Promise((resolve,reject)=>{
      const decode=jwt.verify(token,privateKey,{maxAge:"1h"},(err,token)=>{
        if(err){
          reject(err.message)
        }
        resolve(token);
        
      });
      
    })
  }