import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { SelectOutsourceds } from 'app/components/SelectOutsourceds';
import { SelectStates } from 'app/components/SelectStates';
import { SelectCities } from 'app/components/SelectCities';
import { UnitsApi } from 'api/UnitsApi';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import { States } from 'api/StatesApi';
import { ButtonComponent } from './ButtonComponent';
import Button from '@material-ui/core/Button';

export default function UnitsPage({ history }) {
  const { unitId } = history.location.state;
  
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
  });

  const [values, setValues] = React.useState({
    state: '',
    city: '',
    outsourced: '',
  });

  const [states, setStates] = useState([]);

  const [outsourceds, setOutsources] = useState([]);

  async function fetchOutsources() {
    const response = await OutsourcedsApi.getListOfOutsourceds().then(
      value => value.data.outsourceds
    );
    setOutsources(response);
  }

  async function fetchStates() {
    await States.getListOfStates().then(
      value => setStates(value.data.states)
    );
  }

  function handleInputValues(event) {
    setUnitValues({
      ...unitValues,
      [event.target.name]: event.target.value,
    });
  }

  const getUnitValues = async unitId =>  UnitsApi.getUnitById(unitId).then((value) => {
    const { name, description, city, address, outsourced, id} = value.data.unit;
    setUnitValues({
      id,
      name,
      description,
      state_id: city.state_id,
      city_name: city.name,
      complement: address.complement,
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number
    });

    setValues({
      ...values, outsourced: outsourced.id
    })
  });

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }


  useEffect(() => {
    fetchStates()
    getUnitValues(unitId);
    fetchOutsources();

  }, [])
  
  useEffect(() => {
    if(states.length && values.state === ''){
      const stateName = states.filter(item => item.id === unitValues.state_id)[0]
      stateName !==  undefined && setValues({ ...values, state: stateName.name })
    }
  })

  async function handleUpdateUser(){
    unitValues.outsourced_id = values.outsourced
    console.log(unitValues);
    

    await UnitsApi.updateUnit(unitValues.id, unitValues)

  }

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
          <SelectOutsourceds
            outsourceds={outsourceds}
            ValuesState={values.outsourced}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
      </div>
      <div className="row">
      <div className="col-md-6">
          <SelectStates
            isDisabled={true}
            states={states}
            ValuesState={values.state}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
      <div className="col-md-6">
          <SelectCities
            isDisabled={true}
            states={states}
            stateName={values.state}
            cityCep={unitValues.city_name}
            ValuesCity={values.city}
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

      <Button variant="outlined" onClick={() => handleUpdateUser() }>Atualizar</Button>
    </>
  );
}
