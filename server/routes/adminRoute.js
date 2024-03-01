import express from "express"


export const adminRoute=express.Router()
adminRoute.get("/")
adminRoute.get("/customer")
adminRoute.delete("/customer/:ID")
adminRoute.get("/receipt")
adminRoute.get("/staff")
adminRoute.delete("/staff/:ID")
adminRoute.post("/staff")
adminRoute.get("/book")
adminRoute.get("/hiredBook")
