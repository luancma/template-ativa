import React from 'react';
import { Button, TextField, FormHelperText } from '@material-ui/core';

import { masks } from 'util/masks';
import { useStyles } from './stylesDevices';
import SelectButtons from './SelectButtons';

export default function DefaultDevices({
  values,
  states,
  validateEmail,
  validateButton,
  handleCustomer,
  cities,
  handleChangeSelect,
  customerError,
  handleInputCustomer,
  customer,
}) {
  const classes = useStyles();

  return (
    <>
      <h2 style={{ marginTop: '50px' }}>Cadastro de cliente </h2>
      <TextField
        className={classes.textStyle}
        error={!validateEmail() || customerError.email}
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={customer.email}
        onChange={e => handleInputCustomer(e)}
      />
      {customerError.email && (
        <FormHelperText key={customerError.email} error>
          {`O email  ${customerError.email}`}
        </FormHelperText>
      )}

      <TextField
        className={classes.textStyle}
        label="Name"
        type="text"
        name="name"
        autoComplete="text"
        margin="normal"
        variant="outlined"
        value={customer.name}
        onChange={e => handleInputCustomer(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Função"
        type="text"
        name="occupation"
        margin="normal"
        variant="outlined"
        value={customer.occupation}
        onChange={e => handleInputCustomer(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Responsável"
        type="text"
        name="accountable"
        margin="normal"
        variant="outlined"
        value={customer.accountable}
        onChange={e => handleInputCustomer(e)}
      />
      <TextField
        inputProps={{
          maxLength: 15,
        }}
        className={classes.textStyle}
        label="Telefone"
        type="text"
        name="phone"
        margin="normal"
        variant="outlined"
        value={masks.mascararTel(customer.phone)}
        onChange={e => handleInputCustomer(e)}
      />
      <SelectButtons
        values={values}
        handleChangeSelect={handleChangeSelect}
        cities={cities}
        states={states}
      />
      <Button
        disabled={!validateButton()}
        className={classes.button}
        onClick={e => handleCustomer(e)}
        color="primary"
        variant="contained"
        size="large"
      >
        Criar usuário
      </Button>
    </>
  );
}
