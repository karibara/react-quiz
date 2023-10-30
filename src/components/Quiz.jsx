import { useState } from "react"
import QUESTIONS from "../questions"

export default function Quiz() {
    // Register answers in an array. The number of stored answers in this array is currently question index (because index starts at 0)
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }

    return (
        <div id="quiz">

        <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
                <button onClick={() => {handleSelectAnswer()}}>{answer}</button>
            </li>
        ))}
        </ul>
        </div>
        </div>
    )
}