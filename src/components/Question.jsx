import Anwers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      {/* add key prop to reset a QuestionTimer every time when a question changes */}
      <QuestionTimer timeout={10000} onTimeout={onSelectAnswer} />
      <h2>{questionText}</h2>
      <Anwers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
