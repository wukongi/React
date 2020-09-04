import noteReducer from "./reducers/noteReducer";
import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import showReducer from "./reducers/showReducer";
import usernameReducer from "./reducers/userReducer";
import passwordReducer from "./reducers/passwordReducer";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  notes: noteReducer,
  user: userReducer,
  username: usernameReducer,
  password: passwordReducer,
  message: messageReducer,
  showInfo: showReducer,
});
const store = createStore(reducers);

export default store;
