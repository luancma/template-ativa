import React, {
  useEffect, useRef, useState, Children
} from 'react';
import { Button, TextField, OutlinedInput } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { api } from 'api/api';
import { wrap } from 'module';

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
    margin: '14px 0',
    minWidth: 200,
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
  handleChange,
  validateButton,
  handleCreateUser,
}) {
  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [values, setValues] = React.useState({
    state: '',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

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
        onChange={e => handleInputConfirmPassword(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Responsável"
        type="text"
        name="occupation"
        margin="normal"
        variant="outlined"
        value={userConfirmPassword}
        onChange={e => handleInputConfirmPassword(e)}
      />
      <TextField
        className={classes.textStyle}
        label="Telefone"
        type="text"
        name="phone"
        margin="normal"
        variant="outlined"
        value={userPassword}
        onChange={e => handleInputPassword(e)}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '40vw',
        }}
      >
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
      </div>

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
