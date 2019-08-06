import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { receiveCustomers } from 'actions/Customers';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Teste from './Teste';

function SamplePage({ history }) {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState('');

  const customerStore = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(receiveCustomers());
  }, []);

  useEffect(() => {
    if (customerStore.customers.length !== 0) setCustomers(customerStore.customers);
  });

  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
  });

  function getId(value) {
    customers.find(item => item.email === value && item.id);
  }

  return (
    <>
      <MaterialTable
        title="Usuários"
        columns={state.columns}
        data={
          newCustomers === ''
            ? customers
            : customers.filter(item => item.email !== newCustomers)
        }
        actions={[
          {
            icon: 'visibility',
            tooltip: 'Detalhes',
            onClick: (event, rowData) => history.push({
              pathname: '/app/users',
              state: { detailEmail: getId(rowData.email) },
            }),
          },
          {
            icon: 'delete',
            tooltip: 'Remover',
            onClick: (event, rowData) => setNewCustomers(rowData.email),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={e => history.push('/app/create-user')}
      >
        Adiconar cliente
      </Button>
    </>
  );
}

export default SamplePage;
