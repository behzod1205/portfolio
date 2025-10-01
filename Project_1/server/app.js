import express from "express"
import MainRouter from "./routes/index.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
app.use(MainRouter)

const PORT = process.env.PORT || 3535
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})