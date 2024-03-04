import express from "express";
import { addUser, deleteUser, getAllUser, getUser, updateUser } from "../mongodb/service/userService.js";
import { userValidator } from "../middleware/validator/roleValidator.js";


export const userRoute=express.Router();

userRoute.get("/detailUser",userValidator,getUser);
userRoute.get("/",userValidator,getAllUser)
userRoute.post("/",userValidator,addUser)
userRoute.delete("/delete",userValidator,deleteUser);
userRoute.put("/",userValidator,updateUser)
