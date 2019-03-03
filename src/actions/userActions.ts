import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  getAll
};

function login(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user: any) => {
        dispatch(success(user));
        history.push('/');
      },
      (error: any) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user: any) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user: any) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error: any) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function getAll() {
  return (dispatch: any) => {
    dispatch(request());

    userService.getAll().then(
      (users: any) => dispatch(success(users)),
      (error: any) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users: any) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error: any) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
