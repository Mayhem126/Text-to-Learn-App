import { jsPDF } from "jspdf"

const downloadPDF = (lesson, objectives, lessonContent) => {
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

export default downloadPDF