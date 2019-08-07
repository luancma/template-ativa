import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import { CustomersApi } from 'api/CustomersApi';

function SamplePage({ history }) {
  const [customers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState('');

  const customerStore = useSelector(state => state.customers);

  useEffect(() => {
    CustomersApi.getListOfCustomers().then(value => setCustomers(value.data.customers));
  }, []);

  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
  });

  function getId(value) {
    const { id } = customers.find(item => item.email === value);
    return id;
  }

  function deleteCustomer(rowData) {
    const valorId = customers.find(item => item.email === rowData).id;
    return CustomersApi.removeCustomer(valorId).then(value => console.log(value.data));
  }

  return (
    <div style={{ margin: ' 10%' }}>
      <MaterialTable
        title="Clientes"
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
          },
          {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => history.push({
              pathname: '/app/edit-customer',
              state: { customerId: getId(rowData.email) },
            }),
          },
          {
            icon: 'delete',
            tooltip: 'Remover',
            onClick: (event, rowData) => deleteCustomer(rowData.email),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />

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
    </div>
  );
}

export default SamplePage;
