import { useState } from "react";
import { QuestionInterface } from "../App";

interface QuestionProps {
  quiz: QuestionInterface[];
}

function Questions({ quiz }: QuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string | boolean>(false);

  const { question, correctAnswer, incorrectAnswers, difficulty } =
    quiz[currentQuestion];

  const answers: { answer: string; correct: boolean }[] = incorrectAnswers.map(
    (answer) => {
      return { answer, correct: false };
    }
  );

  const insertIndex = Math.floor(Math.random() * 4);

  answers.splice(insertIndex, 0, { answer: correctAnswer, correct: true });

  const answerQuestion = (correct: boolean) => {
    
    if (correct) {
      setScore((prev) => {
        switch (difficulty) {
          case "easy":
            return prev + 1;
            break;
          case "medium":
            return prev + 2;
            break;
          case "hard":
            return prev + 3;
            break;
          default:
            return prev;
        }
      });
    }
    setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        setAnswered(false);
    }, 1200)
  };

  return (
    <>
      {score}
      <br />
      {question.text}
      <br />
      {answers.map((answer) => {
        return (
          <button
            onClick={() => {
              setAnswered(answer.correct ? "Correct" : "Incorrect");
              answerQuestion(answer.correct);
            }}
          >
            {answer.answer}
          </button>
        );
      })}
      <br />
      {answered && <div>{answered}</div>}
      {answered === "Incorrect" && <div>{`Correct answer: ${correctAnswer}`}</div>}
    </>
  );
}

export default Questions;
