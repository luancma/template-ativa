import {
  CREATE_NEW_USER
} from '../constants/ActionTypes';

export const actionCreateUser = user => ({
  type: CREATE_NEW_USER,
  payload: user
});
