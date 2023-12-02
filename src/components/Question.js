import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up a timeout to decrease timeRemaining every second
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    // Clean up the timeout and trigger onAnswered when timeRemaining hits 0
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timeRemaining for the next question
      onAnswered(false);    // Notify the parent component about the timeout
    }

    // Clean up the timeout when the component unmounts or when the question is answered
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset the timer and notify the parent component about the answer
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
