import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import validator from 'email-validator';
import { ContractsApi } from 'api/ContractsApi';
import CardBox from 'components/CardBox';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

export default function CreateContract({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const [state, setState] = useState({
    name: '',
    number: '',
  });

  function handleInputState(event) {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }
  function handleCreateNewCustomer() {
    const contract = {
      name: state.name,
      number: state.number,
      customer_id: routerParameter,
    };

    ContractsApi.createNewContract(contract)
      .then(
        value =>
          value.data.contract &&
          history.push(`/app/contrato/detalhes/${value.data.contract.id}`)
      )
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <CardBox
        heading={
          <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>
            Criar contrato
          </span>
        }
        styleName="col-12"
        children={
          <>
            <div className="row">
              <div className="col-6">
                <TextField
                  fullWidth
                  label="Nome"
                  type="name"
                  name="name"
                  autoComplete="name"
                  margin="normal"
                  variant="outlined"
                  onChange={e => handleInputState(e)}
                  value={state.email}
                />
              </div>

              <div className="col-6">
                <TextField
                  inputProps={{
                    maxLength: 10,
                  }}
                  fullWidth
                  label="Número do contrato"
                  type="text"
                  name="number"
                  autoComplete="number"
                  margin="normal"
                  variant="outlined"
                  value={state.number}
                  onChange={e => handleInputState(e)}
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-12"
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  marginTop: '20px',
                }}
              >
                <Button
                  onClick={() => handleCreateNewCustomer()}
                  color="primary"
                  variant="contained"
                  size="large"
                >
                  Criar contrato
                </Button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
