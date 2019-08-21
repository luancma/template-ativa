import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { SelectStates } from 'app/components/SelectStates';
import { SelectCities } from 'app/components/SelectCities';
import { SelectOutsourceds } from 'app/components/SelectOutsourceds';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import { States } from 'api/StatesApi';
import Axios from 'axios';
import { ButtonComponent } from './ButtonComponent';

export function FormUnits({ contractInfo }) {
  const [states, setStates] = useState([]);
  const [outsourceds, setOutsources] = useState([]);
  const [units, setUnits] = useState({
    street: '',
    name: '',
    number: '',
    neighborhood: '',
    complement: '',
    city_id: '',
    description: '',
    contract_id: contractInfo.contractId,
  });
  const [cep, setCep] = useState({
    cepNumber: '',
    cepDetails: {},
  });
  const [isDisabled, setDisabled] = useState(false);
  const [values, setValues] = React.useState({
    state: '',
    city: '',
    cityByCep: '',
    outsourced: '',
  });

  async function getIdByState(stateName) {
    const idState = states.filter(item => item.name === stateName)[0];
    return idState;
  }

  async function fetchCities(stateName, city) {
    const state = await getIdByState(stateName);
    const response = await States.getListOfCityByStateId(state.id).then(
      value => value.data.cities
    );
    console.log(6, city);
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

  useEffect(() => {
    fetchStates();
    fetchOutsources();
  }, []);

  async function fetchCep() {
    const response = await Axios.get(
      `https://api.postmon.com.br/v1/cep/${cep.cepNumber}`
    ).then(value => value.data);

    setCep({ ...cep, cepDetails: response });

    console.log(response);
  }

  useEffect(() => {
    if (cep.cepDetails.cep && cep.cepNumber.length < 8) {
      setValues({
        ...values,
        state: '',
        city: '',
        cityByCep: '',
      });
      setCep({ ...cep, cepDetails: {} });
      setUnits({
        name: '',
        street: '',
        neighborhood: '',
        description: '',
        complement: '',
        city_id: '',
        contract_id: '',
        outsourced_id: '',
      });
      setDisabled(false);
    }

    if (!cep.cepDetails.cep && cep.cepNumber.length === 8) {
      fetchCep().then(value => setDisabled(true));
    }

    if (cep.cepDetails.cep && cep.cepNumber.length === 8) {
      const { cidade, logradouro, bairro } = cep.cepDetails;
      const { nome } = cep.cepDetails.estado_info;

      setUnits({
        ...units,
        street: logradouro,
        neighborhood: bairro,
        city_id: values.city,
      });
      setDisabled(true);
      fetchCities(nome, cidade);
    }
  }, [cep.cepNumber, cep.cepDetails]);

  function handleChangeSelect(event) {
    console.log(4, event);

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleInputValues(event) {
    setUnits({
      ...units,
      [event.target.name]: event.target.value,
    });
  }

  function handleInputCep(event) {
    setCep({
      ...cep,
      [event.target.name]: event.target.value,
    });
  }

  const unitObject = {
    name: units.name,
    city_id: values.city,
    cep: cep.cepNumber,
    state: values.state,
    outsourced_id: values.outsourced,
    complement: units.complement,
    contract_id: units.contract_id,
    neighborhood: units.neighborhood,
    number: units.number,
    street: units.street,
    description: units.description,
  };

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
            value={units.name}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <SelectOutsourceds
            outsourceds={outsourceds}
            isDisabled={isDisabled}
            ValuesState={values.outsourced}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-3">
          <TextField
            fullWidth
            label="Cep"
            type="text"
            name="cepNumber"
            autoComplete="text"
            margin="normal"
            value={cep.cepNumber}
            onChange={e => handleInputCep(e)}
          />
        </div>
        <div className="col-md-3">
          <TextField
            fullWidth
            label="Complemento"
            type="text"
            name="complement"
            autoComplete="text"
            margin="normal"
            value={units.complement}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-3">
          <TextField
            fullWidth
            label="Número"
            type="text"
            name="number"
            autoComplete="text"
            margin="normal"
            value={units.number}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-3">
          <TextField
            disabled={isDisabled}
            fullWidth
            label="Logradouro"
            type="text"
            name="street"
            autoComplete="text"
            margin="normal"
            value={units.street}
            onChange={e => handleInputValues(e)}
          />
        </div>

        <div className="col-md-3">
          <TextField
            disabled={isDisabled}
            fullWidth
            label="Bairro"
            type="text"
            name="neighborhood"
            autoComplete="text"
            margin="normal"
            value={units.neighborhood}
            onChange={e => handleInputValues(e)}
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
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TextField
            multiline
            fullWidth
            label="Descrição da unidade"
            type="text"
            name="description"
            autoComplete="text"
            margin="normal"
            value={units.description}
            onChange={e => handleInputValues(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ButtonComponent units={unitObject} />
        </div>
      </div>
    </>
  );
}
