import React, { useState, useEffect } from 'react';
import { TextField, FormGroup, Checkbox, FormControlLabel } from '@material-ui/core';
import validator from 'email-validator';
import ButtonCreate from './ButtonCreate';


export function FormCreateUser({
  handleSubmit,
  handleChangeValue,
  user,
  state,
  handleChangeCheck
}) {
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
            type="password"
            label="Senha"
            value={user.password}
            name="password"
            onChange={handleChangeValue}
          />
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            type="password"
            label="Confirmar senha"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleChangeValue}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        <FormCheckBox state={state} handleChange={handleChangeCheck} />
      </div>

      <ButtonCreate
        validateButton={validateButton}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

function FormCheckBox({ state, handleChange }) {
  return (
    <div className="col-12">
      <FormGroup row style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={
            <Checkbox checked={state.user_create} color="primary" onChange={handleChange('user_create')} value={true} />
          }
          label="Criar"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.user_update} color="primary" onChange={handleChange('user_update')} value={true} />
          }
          label="Atualizar"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.user_show} color="primary" onChange={handleChange('user_show')} value={true} />
          }
          label="Visualizar"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.user_index} color="primary" onChange={handleChange('user_index')} value={true} />
          }
          label="Visualizar todos"
        />
        <FormControlLabel
          control={
            <Checkbox checked={state.user_delete} color="primary" onChange={handleChange('user_delete')} value={true} />
          }
          label="Remover"
        />
      </FormGroup>
    </div >
  )
}
