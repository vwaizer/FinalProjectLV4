import express  from "express";
import { addToCart, getFilterReceipt } from "../mongodb/service/receiptService.js";
import { userValidator } from "../middleware/validator/roleValidator.js";

export const receiptRoute=express.Router();
receiptRoute.get("/:userID",getFilterReceipt)
receiptRoute.post("/addToCart/:ID",userValidator,addToCart)

