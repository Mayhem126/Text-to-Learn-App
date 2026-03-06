import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom"

const LessonNavigate = ({ currentModule, allModules}) => {
    const { courseId, moduleId, lessonId } = useParams()
    const navigate = useNavigate()
    const lessons = currentModule?.lessons
    const lessonIndex = lessons?.findIndex(lesson => lesson._id === lessonId)
    const moduleIndex = allModules?.findIndex(mod => mod._id === moduleId)
    const isFirstLesson = (moduleIndex === 0 && lessonIndex === 0)
    const isLastLesson = (moduleIndex === (allModules?.length - 1) && lessonIndex === allModules?.[moduleIndex].lessons?.length - 1)

    const handleBefore = () => {
        if (lessonIndex > 0) {
            const prevLesson = lessons[lessonIndex - 1]
            navigate(`/course/${courseId}/module/${moduleId}/lesson/${prevLesson._id}`)
        } else {
            
            const prevModule = allModules?.[moduleIndex - 1]
            if (prevModule) {
                const lastLesson = prevModule.lessons[prevModule.lessons.length - 1]
                navigate(`/course/${courseId}/module/${prevModule._id}/lesson/${lastLesson._id}`)
            }
        }
    }

    const handleNext = () => {
        if (lessonIndex < lessons.length - 1) {
            const nextLesson = lessons[lessonIndex + 1]
            navigate(`/course/${courseId}/module/${moduleId}/lesson/${nextLesson._id}`)
        } else {
            const nextModule = allModules?.[moduleIndex + 1]
            if (nextModule) {
                navigate(`/course/${courseId}/module/${nextModule._id}/lesson/${nextModule.lessons[0]._id}`)
            }
        }
    }

    return (
        <div className="flex justify-around mt-10">
            {<MdNavigateBefore onClick={handleBefore} className={`text-5xl ${isFirstLesson && "text-white/50"} ${!isFirstLesson && "hover:text-6xl hover:cursor-pointer ease-out duration-200 hover:drop-shadow-[0px_0px_15px_#fff]"}`}/>}
            {<MdNavigateNext onClick={handleNext} className={`text-5xl ${isLastLesson && "text-white/50"} ${!isLastLesson && "hover:text-6xl hover:cursor-pointer ease-out duration-200 hover:drop-shadow-[0px_0px_15px_#fff]"}`}/>}
        </div>
    )
}

export default LessonNavigate