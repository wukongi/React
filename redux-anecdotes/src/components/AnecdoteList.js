import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const compare = (value) => {
    return (a, b) => {
      return b[value] - a[value];
    };
  };
  const anecdotes = useSelector((state) =>
    state.anecdote.sort(compare("votes"))
  );
  const dispatch = useDispatch();

  const vote = (id, anecdote) => {
    dispatch(giveVote(id, anecdote));
    dispatch(newNotification(anecdote.content));
    setTimeout(() => dispatch(newNotification(null)), 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
