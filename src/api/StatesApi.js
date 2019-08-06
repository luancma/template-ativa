import { api } from './api';

export class States {
  static getListOfStates = () => api.get('states');
}
