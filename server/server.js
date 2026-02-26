const connectToDatabase = require("./src/config/db")
const express = require('express')
const cors = require('cors')
const { PORT, FRONTEND_URL } = require("./src/config/env")

connectToDatabase()

const courseRoute = require("./src/routes/courseRoute")
const lessonRoute = require("./src/routes/lessonRoute")
const youtubeRoute = require("./src/routes/youtubeRoute")

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      FRONTEND_URL,
    ],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
)
app.use(express.json())
app.use("/api/courses", courseRoute)
app.use("/api/lessons", lessonRoute)
app.use("/api/youtube", youtubeRoute)

app.listen(PORT, () => {
  console.log(`Connected to server at PORT ${PORT}`)
})