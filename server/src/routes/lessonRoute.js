const express = require('express')
const router = express.Router()
const protectRoute = require("../middlewares/protectRoute")
const { enrichLessonById, getLessonById } = require("../controllers/lessonController")

router.get('/:lessonId', protectRoute, getLessonById)
router.patch('/:lessonId/generate', protectRoute, enrichLessonById)

module.exports = router