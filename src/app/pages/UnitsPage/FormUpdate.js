import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, FormHelperText } from '@material-ui/core';
import { SelectOutsourceds } from 'app/components/SelectOutsourceds';
import { SelectStates } from 'app/components/SelectStates';
import { UnitsApi } from 'api/UnitsApi';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import { States } from 'api/StatesApi';
import useFetch from '../../hooks/useFetch';
import { SelectTeste } from '../../dumb/SelectTeste';
import { fetchCep, fetchCities } from '../../../util/myFunctions';

export function FormUpdate({ history }) {
  const { unitId } = history.location.state;

  const { data: states } = useFetch(States.getListOfStates, 'states');
  const { data: outsourceds } = useFetch(
    OutsourcedsApi.getListOfOutsourceds,
    'outsourceds'
  );

  const [unitValues, setUnitValues] = useState({
    id: '',
    name: '',
    description: '',
    state_id: '',
    city_name: '',
    complement: '',
    neighborhood: '',
    number: '',
    outsourced: '',
    street: '',
    cep: '',
  });

  const [values, setValues] = React.useState({
    state: '',
    city: '',
    cityByCep: '',
    outsourced: '',
  });

  function handleInputValues(event) {
    setUnitValues({
      ...unitValues,
      [event.target.name]: event.target.value,
    });
  }

  const getUnitValues = async unitId =>
    UnitsApi.getUnitById(unitId).then(value => {
      const {
        name,
        description,
        city,
        address,
        outsourced,
        id,
      } = value.data.unit;

      setUnitValues({
        ...unitValues,
        id,
        name,
        description,
        state_id: city.state_id,
        city_name: city.name,
        complement: address.complement,
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        cep: address.zip_code,
      });

      setValues({
        ...values,
        outsourced: outsourced.id,
        city: city.name,
      });
    });

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    getUnitValues(unitId);
  }, []);

  useEffect(() => {
    if (states.length && values.state === '') {
      const stateName = states.filter(
        item => item.id === unitValues.state_id
      )[0];

      // eslint-disable-next-line no-unused-expressions
      stateName !== undefined &&
        setValues({ ...values, state: stateName.name });
    }
  });

  async function handleUpdateUser() {
    unitValues.outsourced_id = values.outsourced;
    await UnitsApi.updateUnit(unitValues.id, unitValues)
      .then(value => history.goBack())
      .catch(error => {
        alert('Algo de errado ocorreu');
      });
  }

  function cleanAddress() {
    setUnitValues({
      ...unitValues,
      state_id: '',
      city_name: '',
      complement: '',
      street: '',
      neighborhood: '',
      number: '',
    });

    setValues({
      ...values,
      state: '',
      city: '',
    });
  }

  async function changeValues() {
    const response = await fetchCep(unitValues.cep);
    const stateAcronym = response.estado;
    const cityName = response.cidade;

    const stateId = states.filter(item => item.acronym === stateAcronym)[0].id;
    const cityId = await fetchCities(stateId, cityName);

    setValues({
      ...values,
      city: cityName,
    });

    setUnitValues({
      ...unitValues,
      state_id: stateId,
      city_name: cityId,
      street: response.logradouro,
      neighborhood: response.bairro,
    });
  }

  function validateButton() {
    if (values.outsourced === '' || unitValues.name === '') {
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (unitValues.state_id && unitValues.cep.length < 8) {
      cleanAddress();
    }

    if (unitValues.state_id === '' && unitValues.cep.length === 8) {
      changeValues();
    }
  }, [unitValues]);

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
          {unitValues.name === '' && (
            <FormHelperText error>A unidade precisa ter um nome</FormHelperText>
          )}
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="CEP"
            type="text"
            name="cep"
            autoComplete="name"
            margin="normal"
            value={unitValues.cep}
            onChange={e => handleInputValues(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <SelectStates
            isDisabled
            states={states}
            ValuesState={values.state}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-6">
          <SelectTeste
            valuesCity={values.city}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-6">
          <TextField
            disabled
            fullWidth
            label="Bairro"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.neighborhood}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            disabled
            fullWidth
            label="Logradouro"
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            value={unitValues.street}
            onChange={e => handleInputValues(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Número"
            type="text"
            name="number"
            autoComplete="name"
            margin="normal"
            value={unitValues.number}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Complemento"
            type="text"
            name="complement"
            autoComplete="name"
            margin="normal"
            value={unitValues.complement}
            onChange={e => handleInputValues(e)}
          />
        </div>
        <div className="col-md-6">
          <SelectOutsourceds
            outsourceds={outsourceds}
            ValuesState={values.outsourced}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-12">
          <TextField
            multiline
            fullWidth
            label="Descrição da unidade"
            type="text"
            name="description"
            autoComplete="text"
            margin="normal"
            value={unitValues.description}
            onChange={e => handleInputValues(e)}
          />
        </div>
      </div>
      <ButtonUpdate
        handleUpdateUser={handleUpdateUser}
        validateButton={validateButton}
      />
    </>
  );
}

function ButtonUpdate({ handleUpdateUser, validateButton }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: '20px',
      }}
    >
      <Button
        disabled={!validateButton()}
        size="large"
        onClick={() => handleUpdateUser()}
        variant="contained"
        color="primary"
      >
        Atualizar Unidade
      </Button>
    </div>
  );
}
