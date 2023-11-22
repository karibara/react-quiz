import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  // Register answers in an array. The number of stored answers in this array is currently question index (because index starts at 0)
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // quiz is complete (true) when number of questions is equal to activeQuestionIndex
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // useCallback to memoize a function (part 2)
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  // useCallback to memoize a function (part 1)
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    // function is dependency because this function is a value created in component function which could depend on props and state
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
