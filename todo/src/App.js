import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Jumbotron } from "react-bootstrap";
import FormList from "./components/FormList";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterItem, setFilterItem] = useState("null");

  useEffect(() => {
    getLocal();
  }, []);
  useEffect(() => {
    saveLocal();
  }, [todos]);

  const saveLocal = () => {
    localStorage.setItem("todo-list", JSON.stringify(todos));
  };

  const getLocal = () => {
    if (localStorage.getItem("todo-list") === null) {
      localStorage.setItem("todo-list", []);
    } else {
      setTodos(JSON.parse(localStorage.getItem("todo-list")));
    }
  };
  return (
    <Container className=" col-8 mt-4">
      <Jumbotron>
        <h1>Todo List</h1>
      </Jumbotron>
      <FormList
        setTodos={setTodos}
        todos={todos}
        setFilterItem={setFilterItem}
      />
      <Todo todos={todos} filterItem={filterItem} setTodos={setTodos} />
    </Container>
  );
};

export default App;
