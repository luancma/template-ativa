import { api } from './api';

export class States {
  static getListOfStates = () => api.get('states');

  static getListOfCityByStateId = id => api.get(`states/${id}/cities`);
}
