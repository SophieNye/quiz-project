import { useState, Dispatch, SetStateAction } from "react";
import { QuestionInterface } from "../App";
import Category, { SearchParams } from "./Categories";
import "./SelectOptions.css";

interface SelectOptionsProps {
  setQuiz: Dispatch<SetStateAction<QuestionInterface[]>>;
}

function SelectOptions({ setQuiz }: SelectOptionsProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    categories: [
      { selected: false, value: "science", display: "Science" },
      { selected: false, value: "film_and_tv", display: "Film and TV" },
      { selected: false, value: "music", display: "Music" },
      { selected: false, value: "history", display: "History" },
      { selected: false, value: "geography", display: "Geography" },
      {
        selected: false,
        value: "art_and_literature",
        display: "Arts and Literature",
      },
      {
        selected: false,
        value: "sport_and_leisure",
        display: "Sports and Leisure",
      },
      {
        selected: false,
        value: "general_knowledge",
        display: "General Knowledge",
      },
      { selected: false, value: "food_and_drink", display: "Food and Drink" },
    ],
    difficulties: [
      { selected: false, value: "easy", display: "Easy" },
      { selected: false, value: "medium", display: "Medium" },
      { selected: false, value: "hard", display: "Hard" },
    ],
    limit: [
      {
        selected: true,
        value: "10",
        display: "10",
      },
      {
        selected: false,
        value: "20",
        display: "20",
      },
      {
        selected: false,
        value: "30",
        display: "30",
      },
      {
        selected: false,
        value: "40",
        display: "40",
      },
      {
        selected: false,
        value: "50",
        display: "50",
      },
    ],
  });

  const getQuestions = async () => {
    const urlWithParams = new URL("https://the-trivia-api.com/v2/questions");

    Object.keys(searchParams).forEach((param) => {
      const value = searchParams[param as keyof SearchParams];
      const searchString = value.reduce((acc, el) => {
        if (el.selected) return `${acc}${acc.length ? "," : ""}${el.value}`;
        return acc;
      }, "");

      if (searchString.length) {
        urlWithParams.searchParams.append(param, searchString);
      }
    });

    const questionsResponse = await fetch(urlWithParams);
    const questions = await questionsResponse.json();

    console.log(questions);

    setQuiz(questions);
  };
  return (
    <div id="select-options-container">
      <div id="instruction">Customize Your Quiz</div>
      {Object.keys(searchParams).map((param) => (
        <Category
          param={param as keyof SearchParams}
          searchParams={searchParams}
          values={searchParams[param as keyof SearchParams]}
          setSearchParams={setSearchParams}
        />
      ))}
      <button onClick={getQuestions}>Start Quiz</button>
    </div>
  );
}

export default SelectOptions;
