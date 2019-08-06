import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Grid, useMediaQuery } from '@material-ui/core';

import validator from 'email-validator';

import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { formControll } from './styles';

import { actionCreateUser, hideMessageFaild } from '../../actions/User';

import SmallDevices from './SmallDevices';
import DefaultDevices from './DefaultDevices';

function CreateUser({ history }) {
  const dispatch = useDispatch();

  const userMessage = useSelector(state => state.user);

  useEffect(() => {
    if (userMessage.showMessageSuccess) {
      history.push('/app/list');
    }
  });

  useEffect(() => {
    if (userMessage.showMessageFaild === true) {
      setTimeout(() => {
        dispatch(hideMessageFaild());
      }, 100);
    }
  });

  const [state, setState] = React.useState({
    checkedCreate: false,
    checkedRead: false,
    checkedUpdate: false,
    checkedDelete: false,
  });

  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputName = (event) => {
    setName(event.target.value);
  };

  const handleInputPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleInputConfirmPassword = (event) => {
    setUserConfirmPassword(event.target.value);
  };

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  function validateEmail() {
    if (validator.validate(userEmail)) return true;
    return false;
  }

  function handleCreateUser() {
    const userObject = {
      name: userName,
      email: userEmail,
      password: userPassword,
      passwrod_confirmation: userConfirmPassword,
    };
    dispatch(actionCreateUser(userObject));
  }

  function validateButton() {
    if (
      userName.trim() !== ''
      && validateEmail()
      && userPassword.trim() !== ''
      && userConfirmPassword.trim() !== ''
    ) {
      if (userPassword === userConfirmPassword) return true;
    }
    return false;
  }

  const matches = useMediaQuery('(min-width:820px)');
  return (
    <Grid item xs={12} sm={12} container style={formControll}>
      {matches ? (
        <DefaultDevices
          validateEmail={validateEmail}
          handleInputEmail={handleInputEmail}
          handleInputName={handleInputName}
          handleInputPassword={handleInputPassword}
          handleInputConfirmPassword={handleInputConfirmPassword}
          userEmail={userEmail}
          userName={userName}
          userPassword={userPassword}
          userConfirmPassword={userConfirmPassword}
          state={state}
          handleChange={handleChange}
          validateButton={validateButton}
          handleCreateUser={handleCreateUser}
        />
      ) : (
        <SmallDevices
          validateEmail={validateEmail}
          handleInputEmail={handleInputEmail}
          handleInputName={handleInputName}
          handleInputPassword={handleInputPassword}
          handleInputConfirmPassword={handleInputConfirmPassword}
          userEmail={userEmail}
          userName={userName}
          userPassword={userPassword}
          userConfirmPassword={userConfirmPassword}
          state={state}
          handleChange={handleChange}
          validateButton={validateButton}
          handleCreateUser={handleCreateUser}
        />
      )}
      {userMessage.showMessageFaild
        && NotificationManager.error(userMessage.alertMessage)}
      <NotificationContainer />
    </Grid>
  );
}

export default CreateUser;
