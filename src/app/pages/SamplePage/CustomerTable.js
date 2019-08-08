import React from 'react';
import MaterialTable from 'material-table';
import { CustomersApi } from 'api/CustomersApi';

export function CustomerTable({ state, history }) {
  function getId(value) {
    const { id } = state.values.find(item => item.email === value);
    return id;
  }

  function deleteCustomer(rowData) {
    const valorId = state.values.find(item => item.email === rowData).id;
    return CustomersApi.removeCustomer(valorId).then(value => console.log(value.data));
  }

  const actions = [
    {
      icon: 'visibility',
      tooltip: 'Detalhes',
      onClick: (event, rowData) => history.push({
        pathname: '/app/contracts-list',
        state: { customerId: getId(rowData.email) },
      }),
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
  ];

  return (
    <>
      <MaterialTable
        title={state.title}
        columns={state.columns}
        data={state.values}
        actions={actions}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
}
