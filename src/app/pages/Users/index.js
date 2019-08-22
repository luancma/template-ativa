import React, { useState, useEffect } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { UsersApi } from 'api/UsersApi';
import { UserList } from './UserList';

export default function Users({ history }) {
  const [state, setState] = useState({
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
    values: [],
  });

  useEffect(() => {
    UsersApi.getUsersRequest().then(value => setState({ ...state, title: 'Usuários', values: value.data.users }));
  }, []);

  return (
    <div style={{ margin: ' 10%' }}>
      {state.values.length !== 0 ? (
        <>
          <UserList state={state} history={history} />
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
              onClick={e => history.push('/app/users/create')}
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
