import React from 'react';
import { Button, TextField } from '@material-ui/core';
import ButtonComponent from './ButtonComponent';
import { textStyle, formButtons, button } from './styles';


export default function DefaultDevices({
  validateEmail, handleInputEmail, handleInputName, handleInputPassword, handleInputConfirmPassword, userEmail, userName, userPassword, userConfirmPassword, state, handleChange, validateButton, handleCreateUser
}) {
  return (
    <>
      <TextField
        error={!validateEmail()}
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        style={textStyle}
        onChange={e => handleInputEmail(e)}
        value={userEmail}
  />
      <TextField
        label="Name"
        type="text"
        name="name"
        autoComplete="text"
        margin="normal"
        variant="outlined"
        value={userName}
        onChange={e => handleInputName(e)}
        style={textStyle}
  />
      <TextField
        label="Senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userPassword}
        onChange={e => handleInputPassword(e)}
        style={textStyle}
  />
      <TextField
        label="Confirmar senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputConfirmPassword(e)}
        style={textStyle}
  />
      <ButtonComponent state={state} style={button} handleCheck={handleChange} />
      { validateButton() ? (
        <Button
          onClick={e => handleCreateUser(e)}
          color="primary"
          variant="contained"
          size="large"
          style={button}
         >
           Criar usuário
        </Button>
      )
        : (
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={button}
            disabled>
          Criar usuário
          </Button>
        )}
    </>
  );
}
