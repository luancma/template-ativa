import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';
import { States } from 'api/StatesApi';

export function SelectCities({
  states,
  isDisabled,
  stateId,
  ValuesCity,
  cityCep,
  handleChangeSelect,
}) {
  const [cities, setCities] = useState(null);
  const [cityFinded, setCityFinded] = useState('');

  async function getIdByState(stateId) {
    const idState = states.filter(item => item.name === stateId)[0];
    return idState;
  }
  async function fetchCities(stateId) {
    const state = await getIdByState(stateId);

    if (state && cityCep) {
      const response = await States.getListOfCityByStateId(state.id).then(
        value => value.data.cities
      );
      setCities(response);
      const cidade = response.filter(c => c.name === cityCep);
      const setCity = () => setCityFinded(cidade[0].id);
      setCity();
    } else if (state) {
      const response = await States.getListOfCityByStateId(state.id).then(
        value => value.data.cities
      );
      setCities(response);
    }
  }

  useEffect(() => {
    if (stateId === '') {
      setCityFinded('');
    }
    fetchCities(stateId);
  }, [stateId, cityCep]);

  return (
    <FormControl variant="outlined" disabled={isDisabled}>
      <InputLabel htmlFor="outlined-age-simple">Cidades</InputLabel>
      <Select
        name="city"
        value={cityFinded || ValuesCity}
        onChange={handleChangeSelect}
        input={<OutlinedInput name="state" id="outlined-age-simple" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {cities
          && cities.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
