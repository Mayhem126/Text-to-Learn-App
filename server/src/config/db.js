require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URI

const connectToDatabase = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to the database")
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`)
    }
}

module.exports = connectToDatabase