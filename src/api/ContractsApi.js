export class ContractsApi {
  static getListOfContracts = () => api.get('contracts');

  static createNewContract = contract => api.post('contracts', contract);
}
