import React from 'react';
import MaterialTable from 'material-table';
import { CustomersApi } from 'api/CustomersApi';

export function CustomerTable({ state, history }) {
  const { values, title, columns } = state;
  const getId = value => values.find(item => item.email === value).id;

  function deleteCustomer(rowData) {
    const valorId = values.find(item => item.email === rowData).id;
    return CustomersApi.removeCustomer(valorId).then(value =>
      console.log(value.data)
    );
  }

  const actions = [
    {
      icon: 'add_circle',
      tooltip: 'Adicionar Contrato',
      onClick: (event, rowData) => history.push(`/app/contrato/criar/${rowData.id}`)
    },
    {
      icon: 'visibility',
      tooltip: 'Detalhes',
      onClick: (event, rowData) =>
        history.push({
          pathname: `/app/cliente/detalhes/${rowData.id}`,
          state: { customerId: getId(rowData.email) },
        }),
    },
    {
      icon: 'edit',
      tooltip: 'Editar',
      onClick: (event, rowData) =>
        history.push({
          pathname: '/app/cliente/edit',
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
    <MaterialTable
      title={title}
      columns={columns}
      data={values}
      actions={actions}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
