import { useState, useEffect } from "react";

const useTodo = ({ todos, filterItem }) => {
  const [todoFilter, setTodoFilter] = useState([]);
  useEffect(() => {
    switch (filterItem) {
      case "completed":
        setTodoFilter(todos.filter((todo) => todo.compeleted === true));
        break;
      case "uncompleted":
        setTodoFilter(todos.filter((todo) => todo.compeleted === false));
        break;
      default:
        setTodoFilter(todos);
        break;
    }
  }, [filterItem, todos]);
  return todoFilter;
};
export default useTodo;
