import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState, useRef } from "react"
import LessonRenderer from "./LessonRenderer"
import { IoDownload } from "react-icons/io5"
import downloadPDF from "../utils/pdfDownload"
import { FaChevronCircleUp } from "react-icons/fa"
import LessonNavigate from "./LessonNavigate"
import { useParams } from "react-router-dom"
const serverURL = import.meta.env.VITE_SERVER_URL

const Content = ({ lesson, moduleName, courseTopic, refetchCourse, currentModule, allModules }) => {
    const { lessonId, moduleId } = useParams()
    const [lessonContent, setLessonContent] = useState(lesson?.content?.[0]?.content || [])
    const [objectives, setObjectives] = useState(lesson?.content?.[0]?.objectives || [])
    const [loading, setLoading] = useState(false)
    const [enrichError, setEnrichError] = useState(null)
    const { getAccessTokenSilently } = useAuth0()
    const scrollRef = useRef(null)
    const enrichingLessonId = useRef(null)
    

    const lessons = currentModule?.lessons
    const currentLessonIndex = lessons?.findIndex(l => l._id === lessonId)
    const moduleIndex = allModules?.findIndex(m => m._id === moduleId)

    let nextLesson = null
    let nextModuleName = null
    if (currentLessonIndex < lessons?.length - 1) {
        nextLesson = lessons[currentLessonIndex + 1]
        nextModuleName = moduleName
    } else {
        const nextModule = allModules?.[moduleIndex + 1]
        if (nextModule) {
            nextLesson = nextModule.lessons[0]
            nextModuleName = nextModule.title
        }
    }

    const handleScrollUp = () => {
        scrollRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        scrollRef.current.scrollTo({ top: 0 })
    }, [lessonId])

    const enrichLesson = async () => {
        const thisLessonId = lesson._id
        enrichingLessonId.current = thisLessonId
        setLoading(true)
        try {
            const token = await getAccessTokenSilently()

            await fetch(`${serverURL}/lessons/${lesson._id}/generate`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    topic: courseTopic,
                    module: moduleName,
                    lesson: lesson.title,
                    nextLessonId: nextLesson?._id || null,
                    nextModuleName: nextModuleName || null,
                    nextLessonName: nextLesson?.title || null
                })
            })

            const poll = async () => {
                if (enrichingLessonId.current !== thisLessonId) return
            
                const updatedCourse = await refetchCourse()
                if (!updatedCourse) {
                    setTimeout(poll, 3000)
                    return
                }
            
                const updatedLesson = updatedCourse?.modules
                    ?.find(m => m._id === moduleId)
                    ?.lessons?.find(l => l._id === thisLessonId)
            
                if (updatedLesson?.isEnriched) {
                    if (enrichingLessonId.current === thisLessonId) {
                        setLessonContent(updatedLesson.content[0].content)
                        setObjectives(updatedLesson.content[0].objectives)
                        setLoading(false)
                    }
                } else if (updatedLesson?.enrichFailed) {
                    if (enrichingLessonId.current === thisLessonId) {
                        setEnrichError("Failed to generate lesson content. Please try again.")
                        setLoading(false)
                    }
                } else {
                    setTimeout(poll, 3000)
                }
            }

            poll()
        } catch (error) {
            if (enrichingLessonId.current === thisLessonId) {
                setEnrichError("Failed to generate lesson content. Please try again.")
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        setLoading(false)
        setEnrichError(null)
        if (lesson && !lesson.isEnriched) {
            enrichLesson()
        } else {
            setLessonContent(lesson?.content?.[0]?.content || [])
            setObjectives(lesson?.content?.[0]?.objectives || [])
        }
    }, [lesson?._id])

    return (
        <div className="flex-1 min-h-0 overflow-y-auto" ref={scrollRef}>
            <div className="relative text-white py-5 px-10 md:px-15 lg:px-20 xl:px-25 max-w-8xl mx-auto">
                {!loading && <IoDownload onClick={() => downloadPDF(lesson, objectives, lessonContent)} className="absolute right-3 top-3 cursor-pointer text-xl md:text-2xl hover:bg-white hover:text-black rounded-sm duration-200"/>}
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
                    ? <div className="flex justify-center grow my-auto">
                        <p className="text-white/40 text-2xl">Generating lesson content, kindly don't change the lesson.</p>
                      </div>
                    : enrichError
                        ? <div className="flex justify-center grow my-auto">
                            <p className="text-white/40 text-2xl">{enrichError}</p>
                          </div>
                        : <LessonRenderer content={lessonContent} />
                }
                {!loading && <LessonNavigate currentModule={currentModule} allModules={allModules}/>}
                {!loading && <div className="fixed bottom-5 right-6.5 md:text-xl md:right-8 lg:right-10 xl:right-12 hover:cursor-pointer" onClick={handleScrollUp}>
                    <FaChevronCircleUp />
                </div>}
            </div>
        </div>
    )
}

export default Content