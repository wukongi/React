import React from "react";
import List from "./List";
import useTodo from "../hooks/useTodo";
import { ListGroup } from "react-bootstrap";
const Todo = ({ todos, filterItem, setTodos }) => {
  const todoFiltered = useTodo({ todos, filterItem });

  return (
    <ListGroup className="mt-5 ">
      {todoFiltered.map((todo) => (
        <List list={todo} key={todo.id} setTodos={setTodos} todos={todos} />
      ))}
    </ListGroup>
  );
};
export default Todo;
