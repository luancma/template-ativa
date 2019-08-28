import { api } from './api';

export class ContractsApi {
  static getListOfContracts = () => api.get('contracts');

  static getASingleContract = id => api.get(`contracts/${id}`);

  static createNewContract = contract => api.post('contracts', contract);
}
