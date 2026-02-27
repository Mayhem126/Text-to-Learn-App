const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const { GEMINI_KEY } = require("../config/env")

const lessonSchema = z.object({
    title: z.string()
})

const moduleSchema = z.object({
    title: z.string(),
    lessons: z.array(lessonSchema) 
})

const courseSchema = z.object({
    title: z.string().describe("Title of the course"),
    description: z.string().describe("Brief course description"),
    tags: z.array(z.string()).describe("Relevant topic tags"),
    modules: z.array(moduleSchema).describe("3 to 6 modules progressing beginner to advanced")
})

const generateCourse = async (topic) => {
    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY })

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Generate a structured online course about: "${topic}".
        
            Return ONLY a raw JSON object with exactly this structure, no extra fields, no markdown:
            {
                "title": "course title here",
                "description": "brief course description here",
                "tags": ["tag1", "tag2", "tag3"],
                "modules": [
                    {
                        "title": "module title here",
                        "lessons": [
                            { "title": "lesson title here" }
                        ]
                    }
                ]
            }
            
            Rules:
            - Include exactly 3-6 modules
            - Each module must have exactly 3-5 lessons
            - Progress from beginner to advanced
            - Return ONLY the JSON, nothing else`,
            config: {
                responseMimeType: "application/json"
            }
        })

        const parsed = courseSchema.parse(JSON.parse(response.text))
        return parsed
    } catch (error) {
        throw error
    }
}

module.exports = { generateCourse }