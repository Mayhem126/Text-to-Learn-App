const express = require("express")
const router = express.Router()
const protectRoute = require("../middlewares/protectRoute")
const {
    getUserCourses,
    saveCourse
} = require("../controllers/courseController")

router.get("/", protectRoute, getUserCourses)
router.post("/", protectRoute, saveCourse)

module.exports = router