import React, { useState, useEffect } from 'react';

import { Button, CircularProgress } from '@material-ui/core';
import { CustomersApi } from 'api/CustomersApi';
import { CustomerTable } from './CustomerTable';

function SamplePage({ history }) {
  const [state, setState] = useState({
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
    values: [],
  });

  useEffect(() => {
    CustomersApi.getListOfCustomers().then(value => setState({ ...state, title: 'Clientes', values: value.data.customers }));
  }, []);

  return (
    <div style={{ margin: ' 10%' }}>
      {state.values.length !== 0 ? (
        <>
          <CustomerTable state={state} history={history} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: '14px',
            }}
          >
            <Button
              style={{
                padding: '16px',
              }}
              variant="contained"
              color="primary"
              onClick={e => history.push('/app/create-customer')}
            >
              Adicionar Cliente
            </Button>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default SamplePage;
