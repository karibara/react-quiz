import { useRef } from "react";

export default function Anwers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  // check if shuffledAnswer is undefined, so if it is undefined this is the initial state and answers aren't shuffle yet and we want to shuffle it now
  if (!shuffledAnswers.current) {
    // shuffledAnswer value is passing via useRef
    // spread answers into new array and shuffle them
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
    // sort() edit array (not create new), so this is why I create new array, to save an original order (because in original order the firts answer is always correct)
    //   this code here only executes if we still have questions to display
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
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
                onSelect(answer);
              }}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
