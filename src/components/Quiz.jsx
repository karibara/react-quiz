import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import tropheyImg from "../assets/trophey.png";

export default function Quiz() {
  // Register answers in an array. The number of stored answers in this array is currently question index (because index starts at 0)
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // quiz is complete (true) when number of questions is equal to activeQuestionIndex
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // useCallback to memoize a function (part 2)
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    }, 
    // no dependencies because in this function we are not using any state or props, and also not any other values depend on state or props
    []
    )

  // useCallback to memoize a function (part 1)
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),
  // function is dependency because this function is a value created in component function which could depend on props and state
  [handleSelectAnswer])

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={tropheyImg} alt="trophy" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // spread answers into new array and shuffle them
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  // sort() edit array (not create new), so this is why I create new array, to save an original order (because in original order the firts answer is always correct)
  //   this code here only executes if we still have questions to display

  return (
    <div id="quiz">
      <div id="question">
        {/* add key prop to reset a QuestionTimer every time when a question changes */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => {
                  handleSelectAnswer();
                }}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
