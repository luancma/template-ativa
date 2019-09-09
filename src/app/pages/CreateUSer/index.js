/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { UsersApi } from 'api/UsersApi';

import CardBox from 'components/CardBox';
import { FormCreateUser } from './FormCreateUser';
import { userInfo } from 'os';



function CreateUser({ history }) {

  const [state, setState] = React.useState({

  });

  const [message, setMessage] = useState({
    isOpen: false,
    error: '',
  });

  const [valuesUser, setValuesUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_index: false,
    user_show: false,
    user_create: false,
    user_update: false,
    user_delete: false
  });


  useEffect(() => {
    setTimeout(() => {
      setMessage({ isOpen: false });
    }, 1000);
  }, [message]);



  function showMessage(error) {
    const { errors } = error.data;
    setMessage({
      ...message,
      isOpen: true,
      error: `${Object.keys(errors)} ${errors[Object.keys(errors)]}`,
    });
  }

  function handleChangeValue(event) {
    event.preventDefault();
    setValuesUser({
      ...valuesUser,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit() {
    console.log(valuesUser)
    UsersApi.createNewUserRequest(valuesUser)
      .then(value => history.push('/app/usuarios/lista'))
      .catch((error) => {
        showMessage(error.response);
      });
  }


  const handleChangeCheck = name => event => {
    setValuesUser({ ...valuesUser, [name]: event.target.checked });
  };


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
            state={state}
            handleChangeCheck={handleChangeCheck}
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
