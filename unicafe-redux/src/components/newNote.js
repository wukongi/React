import { useDispatch } from "react-redux";
import { createNote } from "../reducers/reducer";
import React from "react";
const NewNote = (props) => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};
export default NewNote;
