import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import LessonRenderer from "./LessonRenderer"
const serverURL = import.meta.env.VITE_SERVER_URL

const Content = ({ lesson, moduleName, courseTopic }) => {
    const [lessonContent, setLessonContent] = useState(lesson?.content?.content || [])
    const [objectives, setObjectives] = useState(lesson?.content?.objectives || [])
    const [loading, setLoading] = useState(false)
    const { getAccessTokenSilently } = useAuth0()

    const enrichLesson = async () => {
        setLoading(true)
        try {            
            const token = await getAccessTokenSilently()
            const response = await fetch(`${serverURL}/lessons/${lesson._id}/generate`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topic: courseTopic,
                    module: moduleName,
                    lesson: lesson.title
                })
            })
            if (!response.ok) return
            const responseData = await response.json()
            setLessonContent(responseData.lesson.content[0].content)
            setObjectives(responseData.lesson.content[0].objectives)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }        
    }

    useEffect(() => {
        console.log("lesson received:", lesson)
        console.log("lesson.content:", lesson?.content)
        if (lesson && !lesson.isEnriched) {
            enrichLesson()
        } else {
            setLessonContent(lesson?.content?.[0]?.content || [])
            setObjectives(lesson?.content?.[0]?.objectives || [])
        }
        // console.log(lessonContent)
        console.log("lessonContent", lessonContent)
    }, [lesson?._id])

    return (
        <div className="text-white py-5 px-10 md:px-15 lg:px-20 xl:px-25 mx-auto overflow-y-scroll">
            <h1 className="font-bold text-3xl text-center md:text-4xl mb-4">{lesson?.title}</h1>
            {objectives.length > 0 && (
                <div className="mb-6 mt-10 bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-[#e03278] font-semibold mb-2">What you'll learn</p>
                    <ul className="flex flex-col gap-1">
                        {objectives.map((obj, i) => (
                            <li key={i} className="text-white/60 text-sm flex gap-2">
                                <span className="text-[#e03278]">✓</span> {obj}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {loading
                ? (
                    <div className="flex justify-center grow my-auto">
                        <p className="text-white/40 text-2xl">Generating lesson content...</p>
                    </div>
                )
                : <LessonRenderer content={lessonContent} />
            }
        </div>
    )
}

export default Content