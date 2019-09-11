/* eslint-disable no-use-before-define */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { States } from 'api/StatesApi';
import { CustomersApi } from 'api/CustomersApi';
import CardBox from 'components/CardBox';
import useFetch from 'app/hooks/useFetch';
import { FormCreateCustomer } from './FormCreateCustomer';

function CreateUser({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const { data: states } = useFetch(States.getListOfStates, 'states');

  const [message, setMessage] = useState({
    isOpen: false,
    error: '',
  });

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
      .then(value =>
        history.push(`/app/cliente/detalhes/${value.data.customer.id}`)
      )
      .catch(error => {
        alert('Erro');
      });
  }
  return (
    <>
      <CardBox
        heading="Novo Cliente"
        styleName="col-12"
        children={[
          <FormCreateCustomer
            objects={[values, customer]}
            key={FormCreateCustomer}
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
export default CreateUser;
