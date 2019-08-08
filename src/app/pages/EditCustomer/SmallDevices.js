import React from 'react';
import { TextField, Button } from '@material-ui/core';
import validator from 'email-validator';
import { masks } from 'util/masks';
import { useStyle } from './editStyles';

export function SmallDevices({
  validateBtn,
  customer,
  EditCustomer,
  handleEditUser,
}) {
  const styles = useStyle();
  return (
    <>
      <span className={styles.spanTitle}>Editar Cliente</span>
      <TextField
        error={customer.name === ''}
        label="Nome"
        className={styles.textStyleSmall}
        margin="normal"
        value={customer.name}
        variant="outlined"
        name="name"
        onChange={e => EditCustomer(e)}
      />
      <TextField
        error={!validator.validate(customer.email)}
        label="Email"
        className={styles.textStyleSmall}
        margin="normal"
        value={customer.email}
        variant="outlined"
        name="email"
        onChange={e => EditCustomer(e)}
      />
      <TextField
        inputProps={{
          maxLength: 15,
        }}
        label="Telefone"
        className={styles.textStyleSmall}
        margin="normal"
        value={masks.mascararTel(customer.phone)}
        variant="outlined"
        name="phone"
        onChange={e => EditCustomer(e)}
      />
      <TextField
        label="Função"
        className={styles.textStyleSmall}
        margin="normal"
        value={customer.occupation}
        variant="outlined"
        name="occupation"
        onChange={e => EditCustomer(e)}
      />
      <TextField
        label="Responsável"
        className={styles.textStyleSmall}
        margin="normal"
        value={customer.accountable}
        variant="outlined"
        name="accountable"
        onChange={e => EditCustomer(e)}
      />

      <Button
        className={styles.buttonSmall}
        disabled={validateBtn(customer)}
        onClick={e => handleEditUser(customer)}
        color="primary"
        variant="contained"
        size="large"
      >
        Editar
      </Button>
    </>
  );
}
