import React from "react";
import { Button, Form, Col } from "react-bootstrap";
const FormList = ({ setTodos, todos, setFilterItem }) => {
  const todoHandler = (e) => {
    e.preventDefault();
    const todo = {
      text: e.target.input_todo.value,
      compeleted: false,
      id: Math.random() * 1000,
    };
    setTodos([...todos, todo]);
    e.target.input_todo.value = "";
  };

  const filterHandler = (e) => {
    setFilterItem(e.target.value);
  };
  return (
    <Form onSubmit={todoHandler}>
      <Form.Row className="align-items-center">
        <Col sm={6}>
          <Form.Control
            type="text"
            className="todo-input"
            name="input_todo"
            autoComplete="off"
          />
        </Col>
        <Col sm={2}>
          <Button variant="outline-success" type="submit">
            <i className="fa fa-plus-square" aria-hidden="true"></i>
          </Button>
        </Col>
        <Col sm={4}>
          <Form.Control as="select" onChange={filterHandler}>
            <option value="all">all</option>
            <option value="completed">compelted</option>
            <option value="uncompleted">uncompelted</option>
          </Form.Control>
        </Col>
      </Form.Row>
    </Form>
  );
};
export default FormList;
