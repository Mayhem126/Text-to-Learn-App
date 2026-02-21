require('dotenv').config()
const connectToDatabase = require("./src/config/db")
const express = require('express')
const cors = require('cors')

connectToDatabase()

const courseRoute = require("./src/routes/courseRoute")

const app = express()

const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
)
app.use(express.json())
app.use("/api/courses", courseRoute)

app.listen(PORT, () => {
  console.log(`Connected to server at PORT ${PORT}`)
})