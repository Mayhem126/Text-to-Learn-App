const { GoogleGenAI } = require("@google/genai")
const { GEMINI_KEY } = require("../config/env")

const generateLessonContent = async (courseTopic, moduleName, lessonName) => {
    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY })

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Generate detailed lesson content for the following:
            Course: "${courseTopic}"
            Module: "${moduleName}"
            Lesson: "${lessonName}"

            Return ONLY a raw JSON object with this exact structure, no markdown, no extra text:
            {
                "title": "lesson title",
                "objectives": ["objective 1", "objective 2", "objective 3"],
                "content": [
                    { "type": "heading", "text": "Section heading here" },
                    { "type": "paragraph", "text": "Detailed explanatory text here" },
                    { "type": "code", "language": "python", "text": "print('example code')" },
                    { "type": "video", "query": "search query for youtube video" },
                    { "type": "mcq", "question": "Question here?", "options": ["Option A", "Option B", "Option C", "Option D"], "answer": 0, "explanation": "Why this answer is correct" }
                ]
            }

            Rules:
            - Start with a heading block introducing the lesson
            - Include 3-5 paragraph blocks explaining key concepts clearly
            - Include a code block ONLY if the topic is programming-related
            - Include exactly 1 video block with a specific search query
            - Include exactly 4-5 MCQ blocks at the end
            - Each MCQ must have exactly 4 options, an answer index (0-3), and an explanation
            - Return ONLY the JSON, nothing else`,
            config: {
                responseMimeType: "application/json"
            }
        })

        console.log("Raw lesson response:", response.text)
        return JSON.parse(response.text)
    } catch (error) {
        console.log("Gemini lesson error:", error)
        throw error
    }
}

module.exports = { generateLessonContent }