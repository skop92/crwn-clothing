import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firebase.utils';

import {
  emailSignInStart,
  googleSignInStart,
  signOutStart,
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
  signOutFailed,
} from './user.action';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserState => {
  if(emailSignInStart.match(action)
    || googleSignInStart.match(action)
    || signOutStart.match(action)
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if(signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }

  if(signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isLoading: false,
    }
  }

  if(signInFailed.match(action)
    || signUpFailed.match(action)
    || signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;
};
