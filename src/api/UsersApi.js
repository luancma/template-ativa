import { api } from './api';

export class UsersApi {
  static getUsersRequest = () => api.get('users');

  static createNewUserRequest = (user) => {
    console.log(2, user);
    return api.post('users', { user });
  };

  static fechSingleUser = id => api.get(`${id}`);

  static updateSingleUser = (id, email, name) => api.put(`${id}`, { name, email });
}
