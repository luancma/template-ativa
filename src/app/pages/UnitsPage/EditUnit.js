import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { SelectOutsourceds } from 'app/components/SelectOutsourceds';
import { SelectStates } from 'app/components/SelectStates';
import { SelectCities } from 'app/components/SelectCities';
import { UnitsApi } from 'api/UnitsApi';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import { States } from 'api/StatesApi';
import { ButtonComponent } from './ButtonComponent';

export default function UnitsPage({ history }) {
  const [unitValues, setUnitValues] = useState({
    name: '',
    description: '',
  });
  const [cep, setCep] = useState({
    cepNumber: '',
    cepDetails: {},
  });

  const [values, setValues] = React.useState({
    state: '',
    city: '',
    cityByCep: '',
    outsourced: '',
  });

  const [states, setStates] = useState([]);

  const [outsourceds, setOutsources] = useState([]);

  async function getIdByState(stateName) {
    const idState = states.filter(item => item.name === stateName)[0];
    return idState;
  }

  async function fetchCities(stateName, city) {
    const state = await getIdByState(stateName);
    const response = await States.getListOfCityByStateId(state.id).then(
      value => value.data.cities
    );
    if (city) {
      const cidade = response.filter(c => c.name === city);
      console.log(values);

      setValues({
        ...values,
        state: stateName,
        cityByCep: city,
        city: cidade[0].id,
      });
    }
  }

  async function fetchOutsources() {
    const response = await OutsourcedsApi.getListOfOutsourceds().then(
      value => value.data.outsourceds
    );
    setOutsources(response);
  }

  async function fetchStates() {
    const response = await States.getListOfStates().then(
      value => value.data.states
    );
    setStates(response);
  }

  const { unitId } = history.location.state;

  function handleInputValues(event) {
    setUnitValues({
      ...unitValues,
      [event.target.name]: event.target.value,
    });
  }

  const getUnitValues = unitId => UnitsApi.getUnitById(unitId).then((value) => {
    const { name, description } = value.data.unit;
    setUnitValues({
      name,
      description,
    });
  });

  useEffect(() => {
    getUnitValues(unitId);
    fetchStates();
    fetchOutsources();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome da unidade"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        {/* <div className="col-md-6">
          <SelectOutsourceds
            outsourceds={outsourceds}
            isDisabled={isDisabled}
            ValuesState={values.outsourced}
            handleChangeSelect={handleChangeSelect}
          />
        </div>

        <div className="col-md-3">
          <SelectStates
            states={states}
            isDisabled={isDisabled}
            ValuesState={values.state}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-3">
          <SelectCities
            states={states}
            isDisabled={isDisabled}
            stateName={values.state}
            cityCep={values.cityByCep}
            ValuesCity={values.city}
            handleChangeSelect={handleChangeSelect}
          />
        </div> */}
      </div>
    </>
  );
}
