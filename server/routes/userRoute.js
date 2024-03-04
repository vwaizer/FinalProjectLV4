import express from "express";
import { addUser, deleteUser, getAllUser, getUser, updateUser } from "../mongodb/service/userService.js";


export const userRoute=express.Router();

userRoute.get("/:ID",getUser);
userRoute.get("/",getAllUser)
userRoute.post("/",addUser)
userRoute.delete("/:ID",deleteUser);
userRoute.put("/:ID",updateUser)
