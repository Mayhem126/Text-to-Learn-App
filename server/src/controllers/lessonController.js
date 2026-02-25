const { enrichLesson, getLesson } = require("../models/lessonModel")
const { generateLessonContent } = require("../services/lessonAiService")

const enrichLessonById = async (req, res) => {
    const { lessonId } = req.params
    const { topic, module, lesson  } = req.body
    const content = await generateLessonContent(topic, module, lesson)

    try {
        const enrichedLesson = await enrichLesson(lessonId, content)
        res.status(201).json({ lesson: enrichedLesson })
    } catch(error) {
        res.status(500).json({ error: "Unable to enrich lesson", details: error.message })
    }
}

const getLessonById = async (req, res) => {
    try {
        const { lessonId } = req.params
        const lesson = await getLesson(lessonId)
        res.status(200).json({ lesson })
    } catch (error) {
        res.status(500).json({ error: "Unable to get lesson content", details: error.message })
    }
}

module.exports = { enrichLessonById, getLessonById }