const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    creator: { type: String, required: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    tags: [{ type: String, trim: true }]
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)

const getCourses = async (user) => {
    const courses = await Course.find({ creator: user }).populate({
        path: 'modules',
        populate: { path: 'lessons' }
    })
    return courses
}

const createCourse = async (title, description, user, tags) => {
    const course = new Course({
        title,
        description,
        creator: user,
        tags,
    })
    await course.save()
    return course
}

const getCourseById = async (courseId) => {
    const course = await Course.findById(courseId).populate({
        path: 'modules',
        populate: { path: 'lessons' }
    })
    return course
}

module.exports = { Course, getCourses, createCourse, getCourseById }