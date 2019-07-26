import { api } from './api';

export class UsersApi {
  static getUsersRequest = () => api.get('users');

  static createNewUserRequest = user => api.post('users', user);

  static fechSingleUser = id => api.get(`${id}`);

  static updateSingleUser = (id, email, name) => api.put(`${id}`, {name, email});
}
