import {
  CREATE_NEW_USER, SHOW_MESSAGE_SUCCESS, HIDE_MESSAGE_SUCCESS, HIDE_MESSAGE_FAILD, SHOW_MESSAGE_FAILD
} from '../constants/ActionTypes';

const INIT_STATE = {
  token: localStorage.getItem('user'),
  user: {},
  alertMessage: '',
  showMessage: false,
  showMessageFaild: false
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case SHOW_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
      };
    }
    case HIDE_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
      };
    }
    case SHOW_MESSAGE_FAILD: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessageFaild: true,
      };
    }
    case HIDE_MESSAGE_FAILD: {
      return {
        ...state,
        alertMessage: '',
        showMessageFaild: false,
      };
    }
    default:
      return state;
  }
};
