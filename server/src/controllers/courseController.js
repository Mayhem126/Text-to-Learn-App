const { getCourses, createCourse, getCourseById } = require("../models/courseModel")
const { generateCourse } = require("../services/aiService")
const { createLesson } = require("../models/lessonModel")
const { createModule } = require("../models/moduleModel")

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

        const moduleIds = []
        for (const mod of generated.modules) {
            const savedModule = await createModule(mod.title, course._id)

            const lessonIds = []
            for (const lesson of mod.lessons) {
                const savedLesson = await createLesson(lesson.title, savedModule._id)
                lessonIds.push(savedLesson._id)
            }

            savedModule.lessons = lessonIds
            await savedModule.save()

            moduleIds.push(savedModule._id)
        }

        course.modules = moduleIds
        await course.save()

        res.status(201).json({ course, modules: generated.modules })
    } catch (error) {
        res.status(500).json({ error: "Failed to generate course", details: error.message })
    }
}

const getCourse = async (req, res) => {
    try{
        const course = await getCourseById(req.params.courseId)
        if (!course) return res.status(404).json({ error: `Course not found`})
        res.json(course)
    } catch (error) {
        res.status(500).json({message: `Failed to fetch course`, details: error.message})
    }
}

module.exports = { getUserCourses, saveCourse, generateAndSaveCourse, getCourse }