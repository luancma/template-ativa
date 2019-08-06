import { api } from './api';

export class CustomersApi {
  static getListOfCustomers = () => api.get('customers');

  static createNewCustomer = customer => api.post('customers', customer);

  static removeCustomer = id => api.delete(`customers/${id}`);

  static fetchSingleCustomers = id => api.get(`customers/${id}`);

  static updateSingleCustomer = (id, customers) => api.put(`customers/${id}`, customers);
}
