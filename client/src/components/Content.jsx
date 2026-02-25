import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
const serverURL = import.meta.env.VITE_SERVER_URL

const Content = ({ lesson, moduleName, courseTopic }) => {
    const [lessonContent, setLessonContent] = useState(lesson?.content || [])
    const [loading, setLoading] = useState(false)
    const { getAccessTokenSilently } = useAuth0()

    const enrichLesson = async () => {
        try {
            setLoading(true)
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
            setLessonContent(responseData.content)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }        
    }

    useEffect(() => {
        if (lesson && !lesson.isEnriched) {
            enrichLesson()
        } else {
            setLessonContent(lesson?.content || [])
        }
    }, [lesson?._id])
    // console.log(lesson)
    // console.log(lesson?.content)
    return (
        <div className="text-white grow p-6">
            <h1 className="font-bold text-2xl md:text-4xl mb-4">{lesson?.title}</h1>
            {loading
                ? <p className="text-white/40">Loading...</p>
                : <p>Content</p>
            }
        </div>
    )
}

export default Content