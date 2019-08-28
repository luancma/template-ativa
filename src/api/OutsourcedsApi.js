import { api } from './api';

export class OutsourcedsApi {
  static createNewOutsourced = outsourced => api.post('outsourceds', outsourced);

  static getListOfOutsourceds = () => api.get('outsourceds');

  static fetchASingleOutsourced = id => api.get(`outsourceds/${id}`);

  static updateASingleOutsourced = (id, obj) => api.put(`outsourceds/${id}`, obj);
}
