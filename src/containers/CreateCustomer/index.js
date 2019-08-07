import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMediaQuery } from '@material-ui/core';
import validator from 'email-validator';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { States } from 'api/StatesApi';
import { CustomersApi } from 'api/CustomersApi';
import { formControll } from './styles';
import SmallDevices from './SmallDevices';
import DefaultDevices from './DefaultDevices';

function CreateUser({ history }) {
  const userMessage = useSelector(state => state.user);
  useEffect(() => {
    if (userMessage.showMessageSuccess) {
      history.push('/app/list');
    }
  });

  const [cities, setCities] = useState([]);
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
    if (values.state) {
      const stateId = states.find(item => item.name === values.state).id;
      States.getListOfCityByStateId(stateId).then(value => setCities(value.data.cities));
    }
  }, [values.state]);

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

  function validateEmail() {
    if (validator.validate(customer.email)) return true;
    return false;
  }

  function validateButton() {
    if (
      customer.name.trim() !== ''
      && validateEmail()
      && customer.phone.trim() !== ''
      && customer.occupation.trim() !== ''
      && customer.accountable.trim() !== ''
      && values.state !== ''
      && values.city !== ''
    ) {
      return true;
    }
    return false;
  }

  function handleCustomer() {
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
        setCustomerError(error.response.data.errors);
      });
  }

  const matches = useMediaQuery('(min-width:820px)');
  return (
    <Grid item xs={12} sm={12} container style={formControll}>
      {matches ? (
        <DefaultDevices
          customer={customer}
          handleInputCustomer={handleInputCustomer}
          handleChangeSelect={handleChangeSelect}
          states={states}
          cities={cities}
          values={values}
          validateEmail={validateEmail}
          validateButton={validateButton}
          handleCustomer={handleCustomer}
          customerError={customerError}
          setCustomerError={setCustomerError}
        />
      ) : (
        <SmallDevices
          validateEmail={validateEmail}
          validateButton={validateButton}
          handleCustomer={handleCustomer}
        />
      )}
      {userMessage.showMessageFaild
        && NotificationManager.error(userMessage.alertMessage)}
      <NotificationContainer />
    </Grid>
  );
}

export default CreateUser;
