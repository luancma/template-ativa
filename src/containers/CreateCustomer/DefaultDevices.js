import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, OutlinedInput } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { api } from 'api/api';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '40vw',
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
    margin: '14px 0 14px ',
    minWidth: '40%',
  },
}));

export default function DefaultDevices({
  values,
  validateEmail,
  handleInputEmail,
  handleInputName,
  handleInputPhone,
  userEmail,
  userName,
  userPassword,
  userConfirmPassword,
  validateButton,
  handleCustomer,
  citys,
  handleChangeCitySelect,
  handleChangeSelect,
}) {
  const classes = useStyles();
  const [states, setStates] = useState([]);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    api('states').then(value => setStates(value.data.states));
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
        label="Função"
        type="text"
        name="occupation"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputPhone(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Responsável"
        type="text"
        name="occupation"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputPhone(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Telefone"
        type="text"
        name="phone"
        margin="normal"
        variant="outlined"
        value={userPassword}
        onChange={e => handleInputPhone(e)}
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
            value={values.citys}
            onChange={handleChangeCitySelect}
            input={(
              <OutlinedInput
                labelWidth={labelWidth}
                name="citys"
                id="outlined-age-simple"
              />
)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {citys !== 0
              && citys.map(item => <MenuItem value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      {validateButton() ? (
        <Button
          className={classes.button}
          onClick={e => handleCustomer(e)}
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
