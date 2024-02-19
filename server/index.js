import express from "express"
import morgan from "morgan"
import { config } from "dotenv";
import cors from "cors";


const app = express()
const port = 3000
config();

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })