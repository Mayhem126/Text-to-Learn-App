const { getCourses, createCourse } = require("../models/courseModel")

const getUserCourses = async (req, res) => {
    try {
    const user = req.auth.sub
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
        const user = req.auth.sub
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

module.exports = { getUserCourses, saveCourse }