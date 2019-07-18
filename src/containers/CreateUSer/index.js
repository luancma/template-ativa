import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import {
  hideMessage,
  showAuthMessage,
} from 'actions/Auth';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
  buttonSmall, button, textStyle, textStyleSmall, formControll, formControllSmall
} from './styles';
import ButtonComponent from './ButtonComponent';

function CreateUser() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.auth);

  useEffect(() => {
    if (userState.showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
  },);

  const [state, setState] = React.useState({
    checkedCreate: false,
    checkedRead: false,
    checkedUpdate: false,
    checkedDelete: false
  });

  const [userEmail, setEmail] = useState('');
  const [userName, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputName = (event) => {
    setName(event.target.value);
  };

  const handleInputPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleInputConfirmPassword = (event) => {
    setUserConfirmPassword(event.target.value);
  };

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleCreateUser() {
    if (
      userName.trim() === ''
      || userEmail.trim() === ''
      || userPassword.trim() === ''
      || userConfirmPassword.trim() === ''
    ) {
      return dispatch(showAuthMessage('Todos os campos são obrigatórios'));
    } if (userPassword.trim() !== userConfirmPassword.trim()) {
      return dispatch(showAuthMessage('As senhas não correspondem'));
    }
    return console.log('chamar criar usuario');
  }

  const matches = useMediaQuery('(min-width:820px)');
  return (
    <Grid item xs={12} sm={12} container style={formControll}>
      {matches ? (
        <>
          <TextField
            id="outlined-email-input"
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
            id="outlined-email-input"
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
            id="outlined-email-input"
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
            id="outlined-email-input"
            label="Confirmar senha"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={userConfirmPassword}
            onChange={e => handleInputConfirmPassword(e)}
            style={textStyle}
        />
          <ButtonComponent state={state} style={formControll} handleCheck={handleChange} />
          <Button
            onClick={e => handleCreateUser(e)}
            color="primary"
            variant="contained"
            size="large"
            style={button}
        >
          Criar usuário
          </Button>
        </>
      ) : (
        <>
          <TextField
            id="outlined-email-input"
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
            id="outlined-email-input"
            label="Senha"
            type="password"
            name="password"
            autoComplete="email"
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
          <Button
            onClick={() => handleCreateUser()}
            color="primary"
            variant="contained"
            style={buttonSmall}
        >
          Criar usuário
          </Button>
        </>
      )}
      {userState.showMessage && NotificationManager.error(userState.alertMessage)}
      <NotificationContainer />
    </Grid>
  );
}

export default CreateUser;
