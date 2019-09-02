import { api } from './api';

export class ServiceOrderApi {
  static getList = async () => api.get('service_orders');
}
