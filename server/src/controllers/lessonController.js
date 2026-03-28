const { getLesson } = require("../models/lessonModel")
const { addEnrichJob } = require("../queues/lessonQueue")

const enrichLessonById = async (req, res) => {
    try {
        const { lessonId } = req.params
        const { topic, module, lesson, courseId, nextLessonId, nextModuleName, nextLessonName } = req.body
        console.log(`Enrich called for lessonId: ${lessonId}`)

        const existingLesson = await getLesson(lessonId)
        if (existingLesson.enrichFailed) {
            existingLesson.enrichFailed = false
            await existingLesson.save()
        }

        await addEnrichJob(lessonId, topic, module, lesson, 1)

        if (nextLessonId) {
            const nextLesson = await getLesson(nextLessonId)
            if (!nextLesson.isEnriched) {
                await addEnrichJob(nextLessonId, topic, nextModuleName, nextLessonName, 10)
            }
        }

        res.status(202).json({ message: "Lesson enrichment queued" })
    } catch (error) {
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