import React, { useState, useEffect } from 'react';
import { States } from 'api/StatesApi';
import Axios from 'axios';
import { TextField, Grid } from '@material-ui/core';
import { SelectStates } from 'app/components/SelectStates';
import { SelectCities } from 'app/components/SelectCities';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import { SelectOutsourceds } from 'app/components/SelectOutsourceds';
import { useStyles } from './unitDevices';

export default function UnitsPage() {
  const [states, setStates] = useState([]);
  const [outsourceds, setOutsources] = useState([]);
  const [units, setUnits] = useState({
    name: '',
    description: '',
    city_id: '',
    contract_id: '',
    outsourced_id: '',
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
      setDisabled(false);
    }

    if (!cep.cepDetails.cep && cep.cepNumber.length === 8) {
      fetchCep().then(value => setDisabled(true));
    }

    if (cep.cepDetails.cep && cep.cepNumber.length === 8) {
      const { cidade } = cep.cepDetails;
      const { nome } = cep.cepDetails.estado_info;
      setValues({ state: nome, cityByCep: cidade });
    }
  }, [cep.cepNumber, cep.cepDetails]);

  function handleChangeSelect(event) {
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

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} container className={classes.formControll}>
      <div className="formInput">
        <input
          name="cepNumber"
          value={cep.cepNumber}
          onChange={e => handleInputCep(e)}
        />

        <TextField
          className={classes.textStyle}
          label="Name"
          type="text"
          name="cepNumber"
          autoComplete="text"
          margin="normal"
          variant="outlined"
          value={cep.cepNumber}
          onChange={e => handleInputValues(e.target.value)}
        />

        <TextField
          className={classes.textStyle}
          label="Name"
          type="text"
          name="name"
          autoComplete="text"
          margin="normal"
          variant="outlined"
          value={units.description}
          onChange={e => handleInputValues(e)}
        />

        <TextField
          className={classes.textStyle}
          label="Name"
          type="text"
          name="name"
          autoComplete="text"
          margin="normal"
          variant="outlined"
          value={units.name}
          onChange={e => handleInputValues(e)}
        />

        <TextField
          className={classes.textStyle}
          label="Name"
          type="text"
          name="name"
          autoComplete="text"
          margin="normal"
          variant="outlined"
          value={units.name}
          onChange={e => handleInputValues(e)}
        />
      </div>

      <SelectOutsourceds
        outsourceds={outsourceds}
        isDisabled={isDisabled}
        ValuesState={values.outsourced}
        handleChangeSelect={handleChangeSelect}
      />

      <SelectStates
        states={states}
        isDisabled={isDisabled}
        ValuesState={values.state}
        handleChangeSelect={handleChangeSelect}
      />

      <SelectCities
        states={states}
        isDisabled={isDisabled}
        stateId={values.state}
        cityCep={values.cityByCep}
        ValuesCity={values.city}
        handleChangeSelect={handleChangeSelect}
      />
    </Grid>
  );
}
