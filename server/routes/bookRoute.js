import express from "express";
import { addBook, deleteBook, getBook, getFilterBook, updateBook } from "../mongodb/service/bookService.js";

export const bookRoute=express.Router();

bookRoute.get("/:ID",getBook);
bookRoute.post("/",addBook);
bookRoute.delete("/:ID",deleteBook);
bookRoute.get("/",getFilterBook);
