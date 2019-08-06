import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, OutlinedInput } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { api } from 'api/api';
import ButtonComponent from './ButtonComponent';
import FormButtons from './FormButtons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  formControl: {
    minWidth: 120,
  },
  formButtons: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    width: '40vw',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formControll: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  formControllSmall: {
    display: 'flex',
    width: '70vw',
    justifyContent: 'space-around',
    padding: '15px',
  },

  button: {
    width: '40vw',
    padding: '14px',
  },

  buttonSmall: {
    width: '70vw',
    padding: '14px',
  },

  textStyle: {
    width: '40vw',
  },

  textStyleSmall: {
    width: '70vw',
  },
  formSelect: {
    marginTop: '14px',
    minWidth: 120,
  },
}));
export default function DefaultDevices({
  validateEmail,
  handleInputEmail,
  handleInputName,
  handleInputPassword,
  handleInputConfirmPassword,
  userEmail,
  userName,
  userPassword,
  userConfirmPassword,
  state,
  handleChange,
  validateButton,
  handleCreateUser,
}) {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.textStyle}
        error={!validateEmail()}
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={e => handleInputEmail(e)}
        value={userEmail}
      />
      <TextField
        className={classes.textStyle}
        label="Name"
        type="text"
        name="name"
        autoComplete="text"
        margin="normal"
        variant="outlined"
        value={userName}
        onChange={e => handleInputName(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userPassword}
        onChange={e => handleInputPassword(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Confirmar senha"
        type="password"
        name="password"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputConfirmPassword(e)}
      />
      {/* <FormButtons /> */}

      {validateButton() ? (
        <Button
          className={classes.button}
          onClick={e => handleCreateUser(e)}
          color="primary"
          variant="contained"
          size="large"
        >
          Criar usuário
        </Button>
      ) : (
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="large"
          disabled
        >
          Criar usuário
        </Button>
      )}
    </>
  );
}
