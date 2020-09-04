const passwordReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_PASS":
      return action.data;
    case "NO_PASS":
      return "";
    default:
      return state;
  }
};
export const setPassword = (password) => {
  return {
    type: "NEW_PASS",
    data: password,
  };
};

export default passwordReducer;
