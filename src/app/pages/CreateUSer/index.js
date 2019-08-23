/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { UsersApi } from 'api/UsersApi';

import CardBox from 'components/CardBox';
import { FormCreateUser } from './FormCreateUser';

function CreateUser({ history }) {
  const [message, setMessage] = useState({
    isOpen: false,
    error: '',
  });
  const [valuesUser, setValuesUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage({ isOpen: false });
    }, 1000);
  }, [message]);

  function showMessage(error) {
    const { errors } = error.response.data;
    setMessage({
      ...message,
      isOpen: true,
      error: `${Object.keys(errors)} ${errors[Object.keys(errors)]}`,
    });
  }

  function handleSubmit(event) {
    UsersApi.createNewUserRequest(valuesUser)
      .then(value => createSuccess())
      .catch((error) => {
        showMessage(error);
      });
  }

  function createSuccess() {
    setTimeout(() => {
      alert('Salvo com sucesso');
    }, 2000);
    history.push('/app/usuarios/lista');
  }

  function handleChangeValue(event) {
    event.preventDefault();
    setValuesUser({
      ...valuesUser,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <CardBox
        heading="Novo Usuário"
        children={[
          <FormCreateUser
            key={FormCreateUser}
            handleSubmit={handleSubmit}
            handleChangeValue={handleChangeValue}
            user={valuesUser}
          />,
        ]}
        styleName="col-12"
      />
      {message.isOpen && NotificationManager.error(message.error)}
      <NotificationContainer />
    </>
  );
}

export default CreateUser;
