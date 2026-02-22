const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: [mongoose.Schema.Types.Mixed], default: [] },
    isEnriched: { type: Boolean, default: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});

const Lesson = mongoose.model('Lesson', lessonSchema)

const createLesson = async (title, moduleId) => {
    const lesson = new Lesson({ title, content: [], module: moduleId})
    await lesson.save()
    return lesson
}

module.exports = { Lesson, createLesson }
    