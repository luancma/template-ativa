import {
  CREATE_NEW_CONTRACT,
  RECEIVE_CONTRACTS,
  RECEIVE_CONTRACTS_SUCCESS,
  RECEIVE_CONTRACTS_FAILED,
  SHOW_MESSAGE_CONTRACTS_FAILD,
  HIDE_MESSAGE_CONTRACTS_FAILD,
  SHOW_MESSAGE_SUCCESS,
  HIDE_MESSAGE_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  contracts: {},
  contract: {},
  alertMessage: '',
  showMessageSuccess: false,
  showMessageFaild: false,
  showLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_CONTRACT: {
      return {
        ...state,
        contract: action.payload,
      };
    }
    case RECEIVE_CONTRACTS: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case RECEIVE_CONTRACTS_SUCCESS: {
      return {
        ...state,
        contracts: action.payload,
        showLoading: false,
      };
    }
    case RECEIVE_CONTRACTS_FAILED: {
      return {
        ...state,
        showMessageFaild: true,
        showLoading: false,
      };
    }
    case SHOW_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessageSuccess: true,
      };
    }
    case HIDE_MESSAGE_SUCCESS: {
      return {
        ...state,
        alertMessage: '',
        showMessageSuccess: false,
      };
    }
    case SHOW_MESSAGE_CONTRACTS_FAILD: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessageFaild: true,
      };
    }
    case HIDE_MESSAGE_CONTRACTS_FAILD: {
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
