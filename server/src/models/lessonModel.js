const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: [mongoose.Schema.Types.Mixed], required: true },
    isEnriched: { type: Boolean, default: false },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
});

module.exports = mongoose.model('Lesson', lessonSchema)
    