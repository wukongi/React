import React, { useEffect, useRef } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./service/note";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
import { initializeNotes, addNewNotes } from "./reducers/noteReducer";
import { logIn, logOut } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { newMessage } from "./reducers/messageReducer";
import { show } from "./reducers/showReducer";
const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const user = useSelector((state) => state.user);
  const showInfo = useSelector((state) => state.showInfo);
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      dispatch(initializeNotes(initialNotes));
    });
  }, [dispatch]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logIn(user));
      noteService.setToken(user.token);
    }
  }, [dispatch]);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      dispatch(addNewNotes(returnedNote));
    });
  };
  const setToken = (token) => {
    noteService.setToken(token);
  };
  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    dispatch(logOut());
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        dispatch(
          initializeNotes(
            notes.map((note) => (note.id !== id ? note : returnedNote))
          )
        );
      })
      .catch((error) => {
        const message = `Note '${note.content}' was already removed from server`;
        dispatch(newMessage(message));
        setTimeout(() => {
          dispatch({ type: "noMessage" });
        }, 5000);
      });
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm setToken={setToken} />
    </Togglable>
  );
  const noteFormRef = useRef();
  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  const notesToShow = showInfo ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={logout}>logout</button>
          </p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => dispatch(show(!showInfo))}>
          show {showInfo ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
