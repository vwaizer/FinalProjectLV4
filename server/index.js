import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import databaseProject from "./mongodb/GetDataBase.js";


const app = express()
const port = 3000
config();

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
databaseProject.run();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })