export class CustomersApi {
  static getListOfCustomers = () => api.get('customers');

  static createNewCustomer = customer => api.post('customers', customer);

  static fetchSingleCustomers = id => api.get(`customers/${id}`);

  static updateSingleCustomer = (id, customers) => api.put(`customers/${id}`, customers);

  static destroyCustomers = id => axios.apilete(`customers/${id}`);
}
