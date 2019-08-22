/* eslint-disable no-use-before-define */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import validator from 'email-validator';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { States } from 'api/StatesApi';
import { CustomersApi } from 'api/CustomersApi';
import CardBox from 'components/CardBox';
import { SelectStates } from 'app/components/SelectStates';
import { SelectCities } from 'app/components/SelectCities';
import { masks } from 'util/masks';
import { ButtonCreate } from './ButtonCreate';

function CreateUser({ history }) {
  const userMessage = useSelector(state => state.user);

  useEffect(() => {
    if (userMessage.showMessageSuccess) {
      alert('Salvo');
      history.push('/app/customers/list');
    }
  });

  const [message, setMessage] = useState({
    isOpen: false,
    error: '',
  });
  const [states, setStates] = useState([]);
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    occupation: '',
    accountable: '',
    phone: '',
    state: '',
    city_id: '',
  });
  const [customerError, setCustomerError] = useState([]);
  const [values, setValues] = useState({
    state: '',
    city: '',
  });

  useEffect(() => {
    States.getListOfStates().then(value => setStates(value.data.states));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage({ isOpen: false });
    }, 1000);
  }, [message]);

  function showMessage(error) {
    const errMessage = error.response.data.errors;
    setCustomerError(errMessage);

    setMessage({
      ...message,
      isOpen: true,
      error: `${Object.keys(errMessage)} ${
        errMessage[Object.keys(errMessage)]
      }`,
    });
  }

  function handleInputCustomer(event) {
    event.preventDefault();
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  }

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleCreateCustomer() {
    const userObject = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      occupation: customer.occupation,
      accountable: customer.accountable,
      state: values.state,
      city_id: values.city,
    };

    userObject.phone = userObject.phone.replace(/[^\d]+/g, '');
    CustomersApi.createNewCustomer(userObject)
      .then(value => value.data.customer && history.push('sample-page'))
      .catch((error) => {
        showMessage(error);
      });
  }
  return (
    <>
      <CardBox
        heading="Novo Cliente"
        styleName="col-12"
        children={[
          <FormCreateUser
            objects={[values, customer]}
            key={FormCreateUser}
            stateName={values.state}
            cityId={values.city}
            states={states}
            handleInput={handleInputCustomer}
            handleCreate={handleCreateCustomer}
            handleChangeSelect={handleChangeSelect}
          />,
        ]}
      />
      {message.isOpen && NotificationManager.error(message.error)}
      <NotificationContainer />
    </>
  );
}

export function FormCreateUser({
  states,
  handleChangeSelect,
  cityId,
  stateName,
  handleCreate,
  handleInput,
  objects,
}) {
  const {
    name, email, occupation, accountable, phone
  } = objects[1];

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <TextField
            value={name}
            name="name"
            fullWidth
            onChange={e => handleInput(e)}
            label="Nome completo"
          />
        </div>
        <div className="col-md-3">
          <TextField
            error={!validator.validate(email)}
            value={email}
            name="email"
            onChange={e => handleInput(e)}
            fullWidth
            label="Email"
          />
        </div>
        <div className="col-md-3">
          <TextField
            value={occupation}
            name="occupation"
            fullWidth
            onChange={e => handleInput(e)}
            label="Função"
          />
        </div>
        <div className="col-md-3">
          <TextField
            value={accountable}
            name="accountable"
            fullWidth
            onChange={e => handleInput(e)}
            label="Responsável"
          />
        </div>
        <div className="col-md-3">
          <TextField
            inputProps={{
              maxLength: 15,
            }}
            value={masks.mascararTel(phone)}
            name="phone"
            fullWidth
            onChange={e => handleInput(e)}
            label="Telefone"
          />
        </div>
        <div className="col-md-3">
          <SelectStates
            ValuesState={stateName}
            states={states}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-3">
          <SelectCities
            states={states}
            ValuesCity={cityId}
            stateName={stateName}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
      </div>
      <ButtonCreate handleCreate={handleCreate} objects={objects} />
    </>
  );
}

export default CreateUser;
