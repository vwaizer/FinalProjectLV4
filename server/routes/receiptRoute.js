import express  from "express";
import { getFilterReceipt } from "../mongodb/service/receiptService.js";

export const receiptRoute=express.Router();
receiptRoute.get("/:userID",getFilterReceipt)

