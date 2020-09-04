import React from "react";
import loginService from "../service/login";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../reducers/userReducer";
import { newMessage } from "../reducers/messageReducer";
import { setUsername } from "../reducers/usernameReducer";
import { setPassword } from "../reducers/passwordReducer";

const LoginForm = ({ setToken }) => {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.password);
  const username = useSelector((state) => state.username);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(setUsername(event.target.Username.value));
    dispatch(setPassword(event.target.Password.value));
    console.log(event.target.Username.value);
    console.log(event.target.Password.value);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(user.token);
      dispatch(logIn(user));
      dispatch({ type: "NO_USERNAME" });
      dispatch({ type: "NO_PASS" });
    } catch (exception) {
      dispatch(newMessage("wrong credentials"));
      setTimeout(() => {
        dispatch({ type: "noMessage" });
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="Username" />
        </div>
        <div>
          password
          <input type="password" name="Password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
