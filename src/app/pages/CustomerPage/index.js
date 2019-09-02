import React, { useState, useEffect } from 'react';

import { Button, CircularProgress } from '@material-ui/core';
import { CustomersApi } from 'api/CustomersApi';
import { CustomerTable } from './CustomerTable';

function SamplePage({ history, match }) {
  const [state, setState] = useState({
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
    values: [],
  });

  useEffect(() => {
    CustomersApi.getListOfCustomers().then(value =>
      setState({ ...state, title: 'Clientes', values: value.data.customers })
    );
  }, []);

  return (
    <div className="container">
      {state.values.length !== 0 ? (
        <>
          <CustomerTable state={state} history={history} />
          <div className="row">
            <div
              className="col-12 col-md-12"
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginTop: '14px',
              }}
            >
              <Button
                className="col-md-4 col-lg-3 col-12"
                size="large"
                variant="contained"
                color="primary"
                onClick={e => history.push('/app/cliente/criar')}
              >
                Adicionar Cliente
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default SamplePage;
