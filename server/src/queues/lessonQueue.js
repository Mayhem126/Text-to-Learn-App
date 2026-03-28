const { Queue } = require("bullmq")
const redisConnection = require("../config/redis")

const lessonQueue = new Queue("lesson-enrichment", { connection: redisConnection })

const addEnrichJob = async (lessonId, courseTopic, moduleName, lessonName, priority = 10) => {
    await lessonQueue.add(
        "enrich",
        { lessonId, courseTopic, moduleName, lessonName },
        { priority }
    )
}

module.exports = { lessonQueue, addEnrichJob }