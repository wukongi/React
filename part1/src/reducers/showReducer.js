const showAll = (state = true, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return action.data;
    default:
      return state;
  }
};
export const show = (info) => {
  return {
    type: "SHOW_ALL",
    data: info,
  };
};

export default showAll;
