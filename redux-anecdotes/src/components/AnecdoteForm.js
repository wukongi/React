import React from "react";
import { useDispatch } from "react-redux";
import { createOne } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createOne(content));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
