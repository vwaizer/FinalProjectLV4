import express from "express";

const userRoute=express.Router();

userRoute.get("/user/:ID",getUser);
userRoute.post("/user",addUser)
userRoute.delete("/user/:ID",deleteUser);
userRoute.put("/user/:ID",updateUser)