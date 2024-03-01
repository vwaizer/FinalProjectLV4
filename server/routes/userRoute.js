import express from "express";
import { addUser, deleteUser, getUser, updateUser } from "../mongodb/service/userService.js";


export const userRoute=express.Router();

userRoute.get("/:ID",getUser);
userRoute.post("/",addUser)
userRoute.delete("/:ID",deleteUser);
userRoute.put("/:ID",updateUser)
