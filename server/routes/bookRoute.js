import express from "express";
import { addBook, deleteBook,  getAllAuthor,  getAllPublisher,  getAllTypes, getDetailBook, getFilterBook } from "../mongodb/service/bookService.js";

export const bookRoute=express.Router();

bookRoute.get("/detailBook/:ID",getDetailBook);
bookRoute.post("/",addBook);
bookRoute.delete("/:ID",deleteBook);
bookRoute.get("/",getFilterBook);
bookRoute.get("/types",getAllTypes)
bookRoute.get("/publisher",getAllPublisher)
bookRoute.get("/author",getAllAuthor)