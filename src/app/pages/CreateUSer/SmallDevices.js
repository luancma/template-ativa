import React from 'react';
import { Button, TextField } from '@material-ui/core';
import ButtonComponent from './ButtonComponent';
import { textStyleSmall, buttonSmall, formControllSmall } from './styles';

export default function SmallDevices({
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
        onChange={e => handleInputEmail(e)}
        value={userEmail}
        style={textStyleSmall}
  />
      <TextField
        label="Nome"
        type="text"
        name="name"
        margin="normal"
        variant="outlined"
        value={userName}
        onChange={e => handleInputName(e)}
        style={textStyleSmall}
  />
      <TextField
        id="outlined-email-input"
        label="Senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userPassword}
        onChange={e => handleInputPassword(e)}
        style={textStyleSmall}
  />
      <TextField
        id="outlined-email-input"
        label="Confirmar senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputConfirmPassword(e)}
        style={textStyleSmall}
  />
      <ButtonComponent state={state} style={formControllSmall} handleCheck={handleChange} />

      { validateButton() ? (
        <Button
          onClick={() => handleCreateUser()}
          color="primary"
          variant="contained"
          style={buttonSmall}
  >
    Criar usuário
        </Button>
      ) : (
        <Button
          disabled
          color="primary"
          variant="contained"
          style={buttonSmall}
  >
    Criar usuário
        </Button>
      )}
    </>
  );
}
