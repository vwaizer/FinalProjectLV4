import express  from "express";
import { addToCart, getAllReceipt, getFilterReceipt } from "../mongodb/service/receiptService.js";
import { userValidator } from "../middleware/validator/roleValidator.js";

export const receiptRoute=express.Router();
receiptRoute.get("/",userValidator,getFilterReceipt)
receiptRoute.post("/addToCart/:ID",userValidator,addToCart)
receiptRoute.get("/getAllReceipt",getAllReceipt)

