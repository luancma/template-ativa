import { SHOW_FORM_ERROR, HIDDEN_FORM_ERROR } from '../actions/FormCreate';

const INITIAL_STATE = {
  visible: false,
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case HIDDEN_FORM_ERROR:
      return {
        ...state,
        visible: false,
        message: action.payload,
      };
    case SHOW_FORM_ERROR:
      return {
        ...state,
        visible: true,
        message: action.payload,
      };
    default:
      return state;
  }
};
