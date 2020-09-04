import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = (props) => {
  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("ALL")}
      />{" "}
      all
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("IMPORTANT")}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("NONIMPORTANT")}
      />
      nonimportant
    </div>
  );
};
export default VisibilityFilter;
