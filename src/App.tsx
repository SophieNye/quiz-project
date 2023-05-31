import { useState } from "react";
import SelectOptions from "./components/SelectOptions";
import Questions from "./components/Questions";
import "./App.css";

export interface QuestionInterface {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  question: { text: string };
  regions: string[] | [];
  type: string;
}

function App() {
  const [quiz, setQuiz] = useState<QuestionInterface[]>(
    [] as QuestionInterface[]
  );
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <>
      <header>
        {!!quiz.length && (
          <div id="question-count">{`${currentQuestion + 1}/${
            quiz.length
          }`}</div>
        )}
        <div id="title">Quizzly</div>
        {!!quiz.length && <div id="score">{score}</div>}
      </header>
      {quiz.length ? (
        <Questions
          quiz={quiz}
          score={score}
          setScore={setScore}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      ) : (
        <SelectOptions setQuiz={setQuiz} />
      )}
    </>
  );
}

export default App;
