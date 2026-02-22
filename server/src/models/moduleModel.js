const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema)

const createModule = async (title, courseId) => {
    const module = new Module({ title, course: courseId })
    await module.save()
    return module
}

module.exports = { Module, createModule }