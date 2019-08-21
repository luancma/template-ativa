import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  OutlinedInput,
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
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  async function getIdByState(stateName) {
    const idState = states.filter(item => item.name === stateName)[0];
    return idState;
  }

  async function fetchCities(stateName) {
    console.log(stateName);

    const state = await getIdByState(stateName);
    const response = await States.getListOfCityByStateId(state.id).then(
      value => value.data.cities
    );
    setCities(response);
    if (cityCep) {
      const cidade = response.filter(c => c.name === cityCep);
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
    <FormControl
      disabled={isDisabled}
      variant="outlined"
      fullWidth
      style={{ margin: '14px 0 14px ' }}
    >
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
