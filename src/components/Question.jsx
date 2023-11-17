import { useState } from "react";

import Anwers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions";

export default function Question({ onSelectAnswer, onSkipAnswer, index }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answer[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  //  if isCorrect is null that means that we might have a selectedAnswer but we don't want show result yet
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    // checking to mark an answer as selected (in aswers)
    answerState = "answered";
  }

  return (
    <div id="question">
      {/* add key prop to reset a QuestionTimer every time when a question changes */}
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Anwers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
