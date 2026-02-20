require('dotenv').config()

const express = require('express')
const cors = require('cors')
const protectRoute = require('./src/middlewares/protectRoute')

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

app.get('/', protectRoute, (req, res) => {
  res.status(201).json({ message: `Protected route` })
})


app.listen(PORT, () => {
  console.log(`Connected to server at PORT ${PORT}`)
})