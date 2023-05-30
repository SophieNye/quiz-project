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
      {values.map((el) => (
        <button
          style={{ backgroundColor: `${el.selected ? "green" : "grey"}` }}
          onClick={() => joggleParam(el)}
        >
          {el.display}
        </button>
      ))}
    </div>
  );
}

export default Category;
