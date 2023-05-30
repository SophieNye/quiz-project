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

  return (
    <>
      {quiz.length ? (
        <Questions quiz={quiz} />
      ) : (
        <SelectOptions setQuiz={setQuiz} />
      )}
    </>
  );
}

export default App;
