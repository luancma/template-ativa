import { api } from './api';

export class UnitsApi {
  static createNewUnit = unit => api.post('/units', unit);

  static getListOfUnits = () => api.get('/units');
}
