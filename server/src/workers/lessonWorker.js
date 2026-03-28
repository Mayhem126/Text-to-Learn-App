const { Worker } = require("bullmq")
const redisConnection = require("../config/redis")
const { generateLessonContent } = require("../services/lessonAiService")
const { enrichLesson, getLesson } = require("../models/lessonModel")
const { Lesson } = require("../models/lessonModel")

const lessonWorker = new Worker("lesson-enrichment", async (job) => {
    const { lessonId, courseTopic, moduleName, lessonName } = job.data

    const lesson = await getLesson(lessonId)
    if (lesson.isEnriched) {
        console.log(`Lesson ${lessonId} already enriched, skipping`)
        return
    }

    console.log(`Enriching lesson: ${lessonName}`)
    const content = await generateLessonContent(courseTopic, moduleName, lessonName)
    await enrichLesson(lessonId, content)
    console.log(`Lesson ${lessonId} enriched successfully`)
}, {
    connection: redisConnection,
    limiter: {
        max: 1,        
        duration: 5000 
    }
})

lessonWorker.on("failed", async (job, err) => {
    console.log(`Job ${job.id} failed: ${err.message}`)
    try {
        const lesson = await Lesson.findById(job.data.lessonId)
        if (lesson && !lesson.isEnriched) {
            lesson.enrichFailed = true
            await lesson.save()
        }
    } catch (error) {
        console.log(`Failed to update enrichFailed: ${error.message}`)
    }
})

module.exports = lessonWorker