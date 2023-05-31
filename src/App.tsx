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

  return (
    <>
      <header>
        <div id="title">
          Quizzly
        </div>
        {!!quiz.length && <div id="score">{score}</div>}
      </header>
      {quiz.length ? (
        <Questions quiz={quiz} score={score} setScore={setScore} />
      ) : (
        <SelectOptions setQuiz={setQuiz} />
      )}
    </>
  );
}

export default App;
