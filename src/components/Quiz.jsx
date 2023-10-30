import { useState } from "react"

export default function Quiz() {
    // currently active question is managed throw the index. In array of questions we manage the index of the currently displayed question, and change the index whenever the user answered a question.
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    // Register answers in an array
    const [userAnswers, setUserAnswers] = useState([])

    return (
        <p>Currently active question</p>
    )
}