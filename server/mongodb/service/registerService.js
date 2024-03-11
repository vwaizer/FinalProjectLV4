import { User } from "../../schema/Schema.js";
import databaseProject from "../GetDataBase.js";
import { createAccessToken } from "../jwt/jwtController.js";
import {ObjectId} from "mongodb"
class UserService {
    async register(payload) {
      const existingAccount = await databaseProject.users.findOne({ email: payload.email });
      console.log(existingAccount);
      if (!existingAccount) {
      
        await databaseProject
          .users
          .insertOne(
            new User({
              username:payload.email,
              password:payload.password,
              fullName:"",
              email:payload.email,
              gender:"other",
              birthday:"--",
              sex:"",
              role:payload.role||""
            })
          );
        const access_token = await createAccessToken({ email:payload.email,password:payload.password });
        return access_token;
        
      }
      return false
    }
  }
  export const registerService = new UserService()

  export const registerController = async(req,res,next) => {
    const accessToken = await registerService.register(req.body);
   
    return res.json({
        message: 'Register successfully',
        access_token: accessToken
    })
}