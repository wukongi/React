const messageReducer = (state = null, action) => {
  switch (action.type) {
    case "newMessage":
      return action.data;
    case "noMessage":
      return null;
    default:
      return state;
  }
};
export const newMessage = (message) => {
  return {
    type: "newMessage",
    data: message,
  };
};

export default messageReducer;
