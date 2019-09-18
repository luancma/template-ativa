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
    <div>
      <>
        <div className="row">
          <div
            className="col-12 col-md-12"
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              marginBottom: '20px',
            }}
          >
            <Button
              className="col-3"
              size="large"
              variant="contained"
              color="primary"
              onClick={e => history.push('/app/cliente/criar')}
            >
              Adicionar Cliente
            </Button>
          </div>
        </div>
        <CustomerTable state={state} history={history} />
      </>
    </div>
  );
}

export default SamplePage;
