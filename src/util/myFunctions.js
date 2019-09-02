import { States } from 'api/StatesApi';
import Axios from 'axios';

export async function fetchCep(cep) {
  const response = await Axios.get(
    `https://api.postmon.com.br/v1/cep/${cep}`
  ).then(value => value.data);

  return response;
}

export async function fetchCities(id, city) {
  const response = await States.getListOfCityByStateId(id).then(
    value => value.data.cities
  );
  return response.filter(c => c.name === city)[0].id;
}
