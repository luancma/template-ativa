import Axios from 'axios';

export class CepApi {
  static getCep = cep => Axios.get(`https://api.postmon.com.br/v1/cep/${cep}`);
}
