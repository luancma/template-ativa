import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import { hideMessage, showAuthLoader, userSignIn } from 'actions/Auth';



// form paradas 

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="text" color="primary" onClick={handleClickOpen} style={{ textTransform: 'none', }}>
        Esqueceu sua senha?
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Recuperar Senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, informe o email cadastrado.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'safety@dev.com',
      password: '123123123',
    };
  }

  componentDidUpdate() {
    const { showMessage, history, authUser } = this.props;

    if (showMessage) {
      setTimeout(() => {
        hideMessage();
      }, 100);
    }
    if (authUser !== null) {
      history.push('/');
    }
  }

  render() {
    const { email, password } = this.state;
    const { showMessage, loader, alertMessage } = this.props;
    return (
      <>
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="app-login-main-content">
            <div className="app-logo-content d-flex align-items-center justify-content-center">
              {/* <Link className="logo-lg" to="/" title="Jambo">
                <img
                  src={require('assets/images/logo.png')}
                  alt="jambo"
                  title="jambo"
                />
              </Link> */}
            </div>

            <div className="app-login-content">
              <div className="app-login-header mb-4">
                <h1>
                  Bem vindo !
                </h1>
              </div>

              <div className="app-login-form">
                <form>
                  <fieldset>
                    <TextField
                      label={<IntlMessages id="appModule.email" />}
                      fullWidth
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                      defaultValue={email}
                      margin="normal"
                      className="mt-1 my-sm-3"
                    />
                    <TextField
                      type="password"
                      label={<IntlMessages id="appModule.password" />}
                      fullWidth
                      onChange={event =>
                        this.setState({ password: event.target.value })
                      }
                      defaultValue={password}
                      margin="normal"
                      className="mt-1 my-sm-3"
                    />

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userSignIn({ email, password });
                        }}
                        variant="contained"
                        color="primary"
                      >
                        <span>Entrar</span>
                      </Button>

                      <FormDialog />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>

          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && NotificationManager.error(alertMessage)}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
  };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
  }
)(SignIn);
