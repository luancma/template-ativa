import { api } from './api';

export class States {
  static getListOfStates = async () => api.get('states');

  static getListOfCityByStateId = async id => api.get(`states/${id}/cities`);
}
