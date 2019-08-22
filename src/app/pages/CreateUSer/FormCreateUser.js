import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import validator from 'email-validator';
import ButtonCreate from './ButtonCreate';

export function FormCreateUser({ handleSubmit, handleChangeValue, user }) {
  const validateEmail = validator.validate(user.email);

  function validateButton() {
    const {
      name, email, password, confirmPassword
    } = user;

    const passwordValidate = () => password === confirmPassword;

    if (
      validateEmail
      && name !== ''
      && password !== ''
      && confirmPassword !== ''
      && passwordValidate() === true
    ) {
      return false;
    }
    return true;
  }

  useEffect(
    () => () => {
      validateButton();
    },
    user
  );

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Nome completo"
            value={user.name}
            name="name"
            onChange={handleChangeValue}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Email"
            value={user.email}
            name="email"
            error={!validateEmail}
            onChange={handleChangeValue}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Senha"
            value={user.password}
            name="password"
            onChange={handleChangeValue}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Confirmar senha"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleChangeValue}
          />
        </div>
      </div>
      <ButtonCreate
        validateButton={validateButton}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
