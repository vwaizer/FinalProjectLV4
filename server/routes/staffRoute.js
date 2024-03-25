import express from "express";
import { sendMail } from "../mongodb/service/mailService.js";
import { getFilterBook } from "../mongodb/service/bookService.js";
import { getAllUser } from "../mongodb/service/userService.js";
import { accounting, createStaff, getAllStaff, getHiredBook, getOverall, putHiredBook } from "../mongodb/service/staffService.js";
import { getAllReceipt } from "../mongodb/service/receiptService.js";
import { staffValidator } from "../middleware/validator/roleValidator.js";


export const staffRoute=express.Router();

staffRoute.get("/book",getFilterBook);
staffRoute.get("/user",getAllUser)
staffRoute.get("/receipt",getAllReceipt);
staffRoute.get("/hireBook",getHiredBook);
staffRoute.put("/hiredBook/:ID",putHiredBook)
staffRoute.get("/accounting",accounting);
staffRoute.post("/mail/:ID",staffValidator,sendMail);
staffRoute.post("/createStaff",createStaff)
staffRoute.get("/overall",getOverall)
staffRoute.get("/getAllStaff",getAllStaff)
