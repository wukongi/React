import React from "react";
import { ListGroup, Button } from "react-bootstrap";
const List = ({ list, todos, setTodos }) => {
  const checkHandle = (e) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === list.id) {
          return { ...todo, compeleted: !todo.compeleted };
        } else {
          return todo;
        }
      })
    );
  };
  const trashHandle = (e) => {
    console.log(e.target);
    setTodos(todos.filter((todo) => todo.id !== list.id));
  };
  return (
    <ListGroup.Item
      variant="info"
      className="d-flex align-items-center justify-content-between list-group-item-action "
    >
      <span className={list.compeleted === false ? "" : "completed"}>
        {list.text}
      </span>
      <div>
        <Button onClick={checkHandle} variant="success" className=" mr-4">
          <i className="fa fa-check"></i>
        </Button>

        <Button onClick={trashHandle} variant="danger">
          <i className="fa fa-trash"></i>
        </Button>
      </div>
    </ListGroup.Item>
  );
};
export default List;
