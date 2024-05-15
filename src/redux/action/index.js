import {ActionTypes} from './actionTypes';

export const loginUser = user => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: user,
  };
};
