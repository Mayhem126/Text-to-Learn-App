import Heading from "./blocks/Heading"
import Paragraph from "./blocks/Paragraph"
import MCQ from "./blocks/MCQ"
import Code from "./blocks/Code"
import Video from "./blocks/Video"

const LessonRenderer = ({ content }) => {
    if (!content || content.length === 0) return null
    return (
        <div className="flex flex-col gap-5">
            {content.map((block, index) => {
                switch(block.type) {
                    case "heading":
                        return (
                            <div key={index}>
                                <Heading text={block.text}/>
                            </div>
                        )
                    case "paragraph":
                        return (
                            <div key={index}>
                                <Paragraph text={block.text}/>
                            </div>                            
                        )
                    case "mcq":
                        return (
                            <div key={index}>
                                {content[index - 1].type !== content[index].type && <p className="font-bold text-lg md:text-xl border-t-[1px] border-white/30 mt-5 py-5">Test your knowledge</p>}
                                <MCQ key={index} question={block.question} options={block.options} answer={block.answer} explanation={block.explanation}/>
                            </div>
                            
                        )
                    case "video":
                        return (
                            <div key={index}>
                                {content[index - 1].type !== content[index].type && <p className="font-bold text-lg md:text-xl border-t-[1px] border-white/30 mt-5 py-5">Video</p>}
                                <Video query={block.query}/>
                            </div>
                        )
                    case "code":
                        return (
                            <div key={index}>
                                {content[index - 1]?.type !== content[index].type && <p className="font-bold text-lg md:text-xl border-t-[1px] border-white/30 mt-5 py-5">Code</p>}
                                <Code key={index} language={block.language} text={block.text}/>
                            </div>
                        )
                    default:
                        return null
                }
            })}            
        </div>
    )
}

export default LessonRenderer