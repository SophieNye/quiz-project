import { Dispatch, SetStateAction } from "react";
import "./Categories.css";

export interface ParamValue {
  selected: boolean;
  value: string;
  display: string;
}

export interface SearchParams {
  categories: ParamValue[];
  difficulties: ParamValue[];
  limit: ParamValue[];
}

interface CategoryProps {
  param: keyof SearchParams;
  values: ParamValue[];
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  searchParams: SearchParams;
}

function Category({ param, setSearchParams, values }: CategoryProps) {
  const categoryTitle =
    param === "categories"
      ? "Categories"
      : param === "difficulties"
      ? "Difficulty Level"
      : "Number of Questions";

  const joggleParam = (el: ParamValue) => {
    const newValues = [...values];

    newValues.forEach((value) => {
      if (value.value === el.value) value.selected = !el.selected;
      else if (param === "limit") value.selected = false;
    });

    setSearchParams((prev) => {
      const newParams = { ...prev };
      newParams[param] = newValues;

      return newParams;
    });
  };
  return (
    <div className="category-section">
      <div id="category-title">{categoryTitle}</div>
      <div>
        {values.map((el) => (
          <button
            onClick={() => joggleParam(el)}
            className={el.selected ? "selected" : "unselected"}
          >
            {el.display}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;
