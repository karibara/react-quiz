import { useState } from "react"
import QUESTIONS from "../questions"

export default function Quiz() {
    // Register answers in an array. The number of stored answers in this array is currently question index (because index starts at 0)
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    // spread answers into new array and shuffle them
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)
    // sort() edit array (not create new), so this is why I create new array, to save an original order (because in original order the firts answer is always correct)

    // quiz is complete (true) when number of questions is equal to activeQuestionIndex
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

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
        {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
                <button onClick={() => {handleSelectAnswer()}}>{answer}</button>
            </li>
        ))}
        </ul>
        </div>
        </div>
    )
}