import { api } from './api';

export class UnitsApi {
  static createNewUnit = unit => api.post('/units', unit);

  static editUnitById = (id, unit) => api.put(`/units/${id}`, unit);

  static getListOfUnits = () => api.get('/units');

  static getUnitById = id => api.get(`units/${id}`);
}
