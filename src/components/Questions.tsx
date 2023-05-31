import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { QuestionInterface } from "../App";
import './Questions.css'

interface QuestionProps {
  quiz: QuestionInterface[];
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

function Questions({ quiz, score, setScore }: QuestionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState<string | boolean>(false);

  const { question, correctAnswer, incorrectAnswers, difficulty } =
    quiz[currentQuestion];

  const answers: { answer: string; correct: boolean }[] = useMemo(() => {
    const answers = incorrectAnswers.map((answer) => {
      return { answer, correct: false };
    });

    const insertIndex = Math.floor(Math.random() * 4);
    answers.splice(insertIndex, 0, { answer: correctAnswer, correct: true });

    return answers;
  }, [correctAnswer, incorrectAnswers]);

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
      setCurrentQuestion((prev) => prev + 1);
      setAnswered(false);
    }, 1200);
  };

  return (
    <div id="questions-container">
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
      {answered === "Incorrect" && (
        <div>{`Correct answer: ${correctAnswer}`}</div>
      )}
    </div>
  );
}

export default Questions;
