import { api } from './api';

export class SessionApi {
  static createNewSession(user) {
    return api.post('auth/sign_in', user);
  }
}

