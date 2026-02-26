const express = require("express")
const router = express.Router()
const protectRoute = require("../middlewares/protectRoute")
const { getVideo } = require("../controllers/youtubeController")

router.get("/", protectRoute, getVideo)

module.exports = router