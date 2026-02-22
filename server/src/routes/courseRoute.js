const express = require("express")
const router = express.Router()
const protectRoute = require("../middlewares/protectRoute")
const {
    getUserCourses,
    saveCourse,
    generateAndSaveCourse
} = require("../controllers/courseController")

router.get("/", protectRoute, getUserCourses)
router.post("/", protectRoute, saveCourse)
router.post("/generate", protectRoute, generateAndSaveCourse)

module.exports = router