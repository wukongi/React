const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_NOTES":
      return action.data;
    case "NEW_NOTES":
      return [...state, action.data];
    default:
      return state;
  }
};

export const initializeNotes = (notes) => {
  return {
    type: "INIT_NOTES",
    data: notes,
  };
};

export const addNewNotes = (note) => {
  return {
    type: "NEW_NOTES",
    data: note,
  };
};
export default noteReducer;
