import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import tropheyImg from "../assets/trophey.png";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");

  // Register answers in an array. The number of stored answers in this array is currently question index (because index starts at 0)
  const [userAnswers, setUserAnswers] = useState([]);

  // make sure that activeQuestionIndex is equal to users answers length if the question isn't answered yet. Otherwise it should be -1, so that we stick to the first question order
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  // quiz is complete (true) when number of questions is equal to activeQuestionIndex
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // useCallback to memoize a function (part 2)
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      console.log("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        // check if the anwer is correct - compare to first answer in  object array
        console.log(selectedAnswer);
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
          console.log("answer correct");
        } else {
          setAnswerState("wrong");
          console.log("answer wrong");
        }
        // reset the answerState
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    // dependencies - when activeQuestionIndex value change function will be recreated
    [activeQuestionIndex]
  );

  // useCallback to memoize a function (part 1)
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    // function is dependency because this function is a value created in component function which could depend on props and state
    [handleSelectAnswer]
  );

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
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => {
                    handleSelectAnswer();
                  }}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
