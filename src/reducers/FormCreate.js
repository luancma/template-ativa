import { SHOW_FORM_ERROR, HIDDEN_FORM_ERROR } from '../actions/FormCreate';

const INITIAL_STATE = {
  message: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case HIDDEN_FORM_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case SHOW_FORM_ERROR:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
};
