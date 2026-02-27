import { useState, useEffect } from "react";

const MCQ = ({ question, options, answer, explanation }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setSelectedOption(null);
        setShowAnswer(false);
        if (localStorage.getItem(`question-${question}`) !== null) {
            setSelectedOption(Number(localStorage.getItem(`question-${question}`)));
            setShowAnswer(true);
        }
    }, [question]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption !== null) {
            setShowAnswer(true);
            localStorage.setItem(`question-${question}`, selectedOption)
        }
    };

    return (
        <form>
            <fieldset className="text-justify">
                <legend>{question}</legend>

                <div className="grid md:grid-cols-2 gap-2">
                    {options.map((option, index) => (
                        <div key={index} className="flex items-start text-left gap-2">
                            <input
                                className="mt-1.5"
                                type="radio"
                                name={`question-${question}`}
                                id={`${question}-${index}`}
                                value={index}
                                checked={selectedOption === index}
                                onChange={() => {
                                    setSelectedOption(index)
                                    setShowAnswer(false)
                                }}
                            />
                            <label htmlFor={`${question}-${index}`}>
                                {option}
                            </label>
                        </div>
                    ))}

                    <button
                        onClick={handleSubmit}
                        className="bg-[#e03278] text-white text-sm font-bold px-6 my-2 h-7 w-fit rounded-xl cursor-pointer hover:bg-[#c02060] transition-all whitespace-nowrap"
                    >
                        Check
                    </button>
                </div>
            </fieldset>

            {showAnswer && (
                <div className="mt-2">
                    {selectedOption === answer ? (
                        <p className="text-green-500 font-bold">Correct ✅</p>
                    ) : (
                        <p className="text-red-500 font-bold">
                            Wrong❌ Correct answer: {options[answer]}
                        </p>
                    )}
                    <p className="text-justify">{explanation}</p>
                </div>
            )}
        </form>
    );
};

export default MCQ;