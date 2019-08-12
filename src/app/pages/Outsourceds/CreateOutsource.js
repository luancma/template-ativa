import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { OutsourcedsApi } from 'api/OutsourcedsApi';
import validator, { validate } from 'email-validator';
import { outsourcedStyle } from './stylesComponent';

export default function CreateOutsource() {
  const [outsourceds, setOutsourceds] = useState({
    fantasy_name: '',
    social_name: '',
    cnpj: '',
    email: '',
    phone: '',
  });

  function handleInputOutsourceds(event) {
    event.preventDefault();
    setOutsourceds({
      ...outsourceds,
      [event.target.name]: event.target.value,
    });
  }

  function validateButton() {
    if (
      validate(outsourceds.email)
      && outsourceds.fantasy_name !== ''
      && outsourceds.cnpj !== ''
      && outsourceds.phone !== ''
    ) {
      return false;
    }
    return true;
  }

  function handleCreateOutsourceds() {
    OutsourcedsApi.createNewOutsourced(outsourceds);
  }

  const classes = outsourcedStyle();
  return (
    <div className={classes.formControll}>
      <span className={classes.spanText}>Cadastro de terceirizado</span>
      <TextField
        className={classes.textStyle}
        error={!validator.validate(outsourceds.email)}
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={outsourceds.email}
        onChange={e => handleInputOutsourceds(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Nome Fantasia"
        type="text"
        name="fantasy_name"
        autoComplete="name"
        margin="normal"
        variant="outlined"
        onChange={e => handleInputOutsourceds(e)}
        value={outsourceds.fantasy_name}
      />
      <TextField
        className={classes.textStyle}
        label="Nome Social"
        type="text"
        name="social_name"
        autoComplete="text"
        margin="normal"
        variant="outlined"
        value={outsourceds.social_name}
        onChange={e => handleInputOutsourceds(e)}
      />
      <TextField
        className={classes.textStyle}
        label="CNPJ"
        type="number"
        name="cnpj"
        margin="normal"
        variant="outlined"
        value={outsourceds.cnpj}
        onChange={e => handleInputOutsourceds(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Tefefone"
        type="text"
        name="phone"
        margin="normal"
        variant="outlined"
        onChange={e => handleInputOutsourceds(e)}
        value={outsourceds.phone}
      />
      <Button
        className={classes.button}
        disabled={validateButton()}
        color="primary"
        variant="contained"
        size="large"
        onClick={e => handleCreateOutsourceds(e)}
      >
        Criar terceirizado
      </Button>
    </div>
  );
}
