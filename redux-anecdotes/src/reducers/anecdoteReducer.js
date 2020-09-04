import anecdoteService from "../services/anecdote";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "GIVE_VOTE": {
      const updatedOne = action.data;
      const updatedState = state.filter((one) => one.id !== updatedOne.id);
      return [...updatedState, updatedOne];
    }
    case "CREATE_ONE":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
      return state;
  }
};
export const giveVote = (id, anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(id, anecdote);
    dispatch({
      type: "GIVE_VOTE",
      data: newAnecdote,
    });
  };
};
export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export const createOne = (newOne) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(newOne);
    dispatch({
      type: "CREATE_ONE",
      data: anecdote,
    });
  };
};
export default anecdoteReducer;
