import express from "express";
import { addUser, deleteUser, getAllUser, getDetailUser, updateUser } from "../mongodb/service/userService.js";
import { staffValidator, userValidator } from "../middleware/validator/roleValidator.js";


export const userRoute=express.Router();

userRoute.get("/detailUser",userValidator,getDetailUser);

userRoute.post("/",userValidator,addUser)
userRoute.delete("/delete",userValidator,deleteUser);
userRoute.put("/changeInfo",userValidator,updateUser)
