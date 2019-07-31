import {
  RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS_SUCCESS,
} from 'constants/ActionTypes';

const INITIAL_STATE = {
  customers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_CUSTOMERS:
      return {
        ...state,
      };
    case RECEIVE_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      };
    default:
      return state;
  }
};
