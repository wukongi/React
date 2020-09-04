const initialNotice = ["no notification"];

const notificationReducer = (state = initialNotice, action) => {
  if (action.type === "NOTIFICATION") {
    return action.content;
  }
  return state;
};
export default notificationReducer;

export const newNotification = async (content) => {
  return {
    type: "NOTIFICATION",
    content: content === null ? "no notification" : `you voted '${content}'`,
  };
};
