import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandle } from "./middleware/errorHandle/errorHandler.js";
import databaseProject from "./mongodb/GetDataBase.js";
import { bookRoute } from "./routes/bookRoute.js";
import { staffRoute } from "./routes/staffRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { loginRoute } from "./routes/loginRoute.js";

const app = express()
const port = 3000
config();
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)
app.use("/book",bookRoute)
app.use("/admin",staffRoute)
app.use("/",loginRoute)
app.use(errorHandle)
databaseProject.run();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })