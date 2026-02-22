const { getCourses, createCourse } = require("../models/courseModel")
const { generateCourse } = require("../services/aiService")

const getUserCourses = async (req, res) => {
    try {
    const user = req.auth.payload.sub
    const courses = await getCourses(user)
    res.json(courses)
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch courses",
            details: error.message
        })
    }
}

const saveCourse = async (req, res) => {
    try {
        const user = req.auth.payload.sub
        const { title, description, tags } = req.body
        const course = await createCourse(title, description, user, tags)

        res.status(201).json(course)
    } catch (error) {
        res.status(500).json({ 
            error: "Failed to save course", 
            details: error.message 
        })
    }
}

const generateAndSaveCourse = async (req, res) => {
    try {
        console.log("req.auth:", req.auth)
        console.log("Generating course for topic:", req.body.topic)
        const user = req.auth.payload.sub
        const { topic } = req.body

        const generated = await generateCourse(topic)
        const course = await createCourse(
            generated.title,
            generated.description,
            user,
            generated.tags,
        )

        res.status(201).json({ course, modules: generated.modules })
    } catch (error) {
        res.status(500).json({ error: "Failed to generate course", details: error.message })
    }
}

module.exports = { getUserCourses, saveCourse, generateAndSaveCourse }