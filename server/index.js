import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import databaseProject from "./mongodb/GetDataBase.js";
import { userRoute } from "./routes/userRoute.js";
import { bookRoute } from "./routes/bookRoute.js";
import { staffRoute } from "./routes/staffRoute.js";
import { adminRoute } from "./routes/adminRoute.js";
import { errorHandle } from "./middleware/errorHandle/errorHandler.js";


const app = express()
const port = 3000
config();

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)
app.use("/book",bookRoute)
app.use("/staff",staffRoute)
app.use("/admin",adminRoute)
app.use(errorHandle)
databaseProject.run();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })