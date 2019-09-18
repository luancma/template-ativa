import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from '@material-ui/core';
import { States } from 'api/StatesApi';

export function SelectCities({
  states,
  isDisabled,
  stateName,
  ValuesCity,
  cityCep,
  handleChangeSelect,
}) {
  const [cities, setCities] = useState(null);
  const [cityFinded, setCityFinded] = useState('');
  const inputLabel = React.useRef(null);

  async function getIdByState(stateName) {
    const idState = states.filter(item => item.name === stateName)[0];
    return idState;
  }

  async function fetchCities(stateName) {
    const state = await getIdByState(stateName);
    const response = await States.getListOfCityByStateId(state.id).then(
      value => value.data.cities
    );
    setCities(response);
    if (cityCep) {
      const cidade = response.filter(c => c.name === cityCep);
      console.log(4, cidade);

      const setCity = () => setCityFinded(cidade[0].id);
      setCity();
    }
  }

  useEffect(() => {
    if (stateName === '') {
      setCityFinded('');
    }
    if (stateName) {
      fetchCities(stateName);
    }
  }, [stateName, cityCep]);

  return (
    <FormControl disabled={isDisabled} fullWidth>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        Cidades
      </InputLabel>
      <Select
        name="city"
        value={cityFinded || ValuesCity}
        onChange={handleChangeSelect}
        input={<Input name="state" id="outlined-age-simple" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {cities &&
          cities.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
