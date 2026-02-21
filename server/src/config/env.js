const dotenv = require('dotenv')

dotenv.config()

const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER = process.env.AUTH0_ISSUER
const FRONTEND_URL = process.env.FRONTEND_URL
const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI

module.exports = {
    AUTH0_AUDIENCE,
    AUTH0_ISSUER,
    FRONTEND_URL,
    PORT,
    MONGO_URI
}