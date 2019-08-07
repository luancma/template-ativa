import React, { useEffect } from 'react';
import { Button, TextField, OutlinedInput } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { masks } from 'util/masks';
import { useStyles } from './stylesDevices';

export default function DefaultDevices({
  values,
  states,
  validateEmail,
  validateButton,
  handleCustomer,
  cities,
  handleChangeSelect,
  handleInputCustomer,
  customer,
}) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <>
      <h2 style={{ marginTop: '50px' }}>Cadastro de cliente </h2>
      <TextField
        className={classes.textStyle}
        error={!validateEmail()}
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={customer.email}
        onChange={e => handleInputCustomer(e)}
      />
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
      <div className={classes.selectGroup}>
        <FormControl variant="outlined" className={classes.formSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Estado
          </InputLabel>
          <Select
            value={values.state}
            onChange={handleChangeSelect}
            input={(
              <OutlinedInput
                labelWidth={labelWidth}
                name="state"
                id="outlined-age-simple"
              />
)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {states !== 0
              && states.map(item => (
                <MenuItem value={item.name}>{item.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formSelect}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Cidade
          </InputLabel>
          <Select
            value={values.city}
            onChange={handleChangeSelect}
            input={(
              <OutlinedInput
                labelWidth={labelWidth}
                name="city"
                id="outlined-age-simple"
              />
)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cities.length !== 0
              && cities.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
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
