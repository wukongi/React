const usernameReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_USERNAME":
      return action.data;
    case "NO_USERNAME":
      return "";
    default:
      return state;
  }
};
export const setUsername = (username) => {
  return {
    type: "NEW_USERNAME",
    data: username,
  };
};

export default usernameReducer;
