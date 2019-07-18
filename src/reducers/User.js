import {
  CREATE_NEW_USER
} from '../constants/ActionTypes';

const INIT_STATE = {
  token: localStorage.getItem('user'),
  user: {},
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_USER: {
      return {
        ...state,
        token: state.token,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
