import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import validator from 'email-validator';
import { makeStyles } from '@material-ui/core/styles';
import { ContractsApi } from 'api/ContractsApi';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  spanText: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '32px',
  },
  button: {
    width: '30vw',
    padding: '14px',
  },
  buttonSmall: {
    width: '50vw',
    padding: '14px',
  },
  textStyle: {
    width: '30vw',
  },
  textStyleSmall: {
    width: '70vw',
  },
}));

export default function CreateContract({ location, history }) {
  const [state, setState] = useState({
    name: '',
    number: '',
    idUser: '',
  });

  function handleInputState(event) {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  function handleCreateNewCustomer() {
    const user = {
      name: state.name,
      number: state.number,
      customer_id: location.state.customerId,
    };

    ContractsApi.createNewContract(user).then(value => history.push({
      pathname: '/app/contracts-list',
      state: { customerId: value.data.contract.customer.id },
    }));
  }

  const emailValidate = validator.validate(state.email);

  const style = useStyles();
  return (
    <div className={style.root}>
      <span className={style.spanText}>Criar novo contrato</span>
      <TextField
        className={style.textStyle}
        error={emailValidate}
        label="Nome"
        type="name"
        name="name"
        autoComplete="name"
        margin="normal"
        variant="outlined"
        onChange={e => handleInputState(e)}
        value={state.email}
      />
      <TextField
        inputProps={{
          maxLength: 10,
        }}
        className={style.textStyle}
        label="Número do contrato"
        type="text"
        name="number"
        autoComplete="number"
        margin="normal"
        variant="outlined"
        value={state.number}
        onChange={e => handleInputState(e)}
      />

      <Button
        className={style.button}
        onClick={() => handleCreateNewCustomer()}
        color="primary"
        variant="contained"
        size="large"
      >
        Criar contrato
      </Button>
    </div>
  );
}
