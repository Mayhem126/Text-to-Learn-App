import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import LessonRenderer from "./LessonRenderer"
import { IoDownload } from "react-icons/io5";
import { jsPDF } from "jspdf"
const serverURL = import.meta.env.VITE_SERVER_URL

const Content = ({ lesson, moduleName, courseTopic, refetchCourse }) => {
    const [lessonContent, setLessonContent] = useState(lesson?.content?.content || [])
    const [objectives, setObjectives] = useState(lesson?.content?.objectives || [])
    const [loading, setLoading] = useState(false)
    const [enrichError, setEnrichError] = useState(null)
    const { getAccessTokenSilently } = useAuth0()

    const downloadPDF = () => {
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
        
        const pageWidth = pdf.internal.pageSize.getWidth()
        const margin = 15
        const maxWidth = pageWidth - margin * 2
        let y = 20
    
        const addText = (text, fontSize, isBold = false, color = [255, 255, 255]) => {
            pdf.setFontSize(fontSize)
            pdf.setFont("helvetica", isBold ? "bold" : "normal")
            pdf.setTextColor(...color)
            const lines = pdf.splitTextToSize(text, maxWidth)
            lines.forEach(line => {
                if (y > 270) { addNewPage() }
                pdf.text(line, margin, y)
                y += fontSize * 0.5
            })
            y += 4
        }

        const addNewPage = () => {
            pdf.addPage()
            pdf.setFillColor(8, 8, 20)
            pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), "F")
            y = 20
        }
    
        pdf.setFillColor(8, 8, 20)
        pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), "F")
    
        addText(lesson?.title || "", 22, true, [255, 255, 255])
        y += 5
    

        if (objectives.length > 0) {
            addText("What you'll learn", 13, true, [224, 50, 120])
            objectives.forEach(obj => addText(`✓ ${obj}`, 7, false, [180, 180, 180]))
            y += 5
        }

        lessonContent.forEach(block => {
            if (y > 270) { addNewPage() }
    
            switch (block.type) {
                case "heading":
                    addText(block.text, 14, true, [255, 255, 255])
                    break
                case "paragraph":
                    addText(block.text, 10, false, [200, 200, 200])
                    break
                case "code":
                    addText(`[${block.language}]`, 9, true, [224, 50, 120])
                    addText(block.text, 8, false, [150, 220, 150])
                    y += 3
                    break
                case "mcq":
                    addText(`Q: ${block.question}`, 10, true, [255, 255, 255])
                    block.options.forEach((opt, i) => {
                        const isAnswer = i === block.answer
                        addText(`${i + 1}. ${opt}`, 9, false, isAnswer ? [100, 220, 100] : [180, 180, 180])
                    })
                    addText(`Explanation: ${block.explanation}`, 9, false, [150, 150, 150])
                    y += 3
                    break
                default:
                    break
            }
        })
    
        pdf.save(`${lesson?.title || "lesson"}.pdf`)
    }

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
            if (!response.ok) {
                setEnrichError("Failed to generate lesson content. Please try again.")
                return
            }
            const responseData = await response.json()
            setLessonContent(responseData.lesson.content[0].content)
            setObjectives(responseData.lesson.content[0].objectives)
            await refetchCourse()
        } catch (error) {
            setEnrichError("Failed to generate lesson content. Please try again.")
        } finally {
            setLoading(false)
        }        
    }

    useEffect(() => {
        if (lesson && !lesson.isEnriched) {
            enrichLesson()
        } else {
            setLessonContent(lesson?.content?.[0]?.content || [])
            setObjectives(lesson?.content?.[0]?.objectives || [])
        }
    }, [lesson?._id])

    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="relative text-white py-5 px-10 md:px-15 lg:px-20 xl:px-25 max-w-8xl mx-auto">
                <IoDownload onClick={downloadPDF} className="absolute right-3 top-3 cursor-pointer text-xl md:text-2xl hover:bg-white hover:text-black rounded-sm duration-200"/>
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
                    : enrichError
                        ? <div className="flex justify-center grow my-auto">
                            <p className="text-white/40 text-2xl">{enrichError}</p>
                        </div> 
                        : <LessonRenderer content={lessonContent} />
                }
            </div>
        </div>

    )
}

export default Content