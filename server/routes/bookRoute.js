import express from "express";
import { addBook, deleteBook, getDetailBook, getFilterBook, updateBook } from "../mongodb/service/bookService.js";

export const bookRoute=express.Router();

bookRoute.get("/:ID",getDetailBook);
bookRoute.post("/",addBook);
bookRoute.delete("/:ID",deleteBook);
bookRoute.get("/",getFilterBook);
