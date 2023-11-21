import { useState, useEffect } from "react";

// first props is timeout - makes component configurable
// second prop - function - when the timer expire the parent component will know about that (to skip to next question)

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // debounce
  useEffect(() => {
    // the fnc onTimeout will be called by the browser once this timeout expired
    const timer = setTimeout(onTimeout, timeout);
    // add cleanup function to stop timer
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    // update state based on previous stored value - it is prev remaining time - 100 (mibus my frequency)
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    // add cleanup function to stop interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={mode}
    ></progress>
  );
}
