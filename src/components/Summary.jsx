import tropheyImg from "../assets/trophey.png";

export default function Summary() {
  return (
    <div id="summary">
      <img src={tropheyImg} alt="trophy" />
      <h2>Quiz Completed!</h2>
    </div>
  );
}
