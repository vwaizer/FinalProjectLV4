import express from "express";
import { addBook, deleteBook,  getAllAuthor,  getAllPublisher,  getAllTypes, getDetailBook, getField, getFilterBook, postHiredBook } from "../mongodb/service/bookService.js";
import { userValidator } from "../middleware/validator/roleValidator.js";

export const bookRoute=express.Router();

bookRoute.get("/" ,getFilterBook);
bookRoute.get("/detailBook/:ID",getDetailBook);
bookRoute.post("/",addBook);
bookRoute.delete("/:ID",deleteBook);
bookRoute.get("/types",getAllTypes)
bookRoute.get("/publisher",getAllPublisher)
bookRoute.get("/author",getAllAuthor)
bookRoute.post("/hiredBook",userValidator,postHiredBook)
bookRoute.get("/field",getField)