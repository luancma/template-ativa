import React from 'react';
import MaterialTable from 'material-table';
import { CustomersApi } from 'api/CustomersApi';

export function UserList({ state, history }) {
  const getId = value => state.values.find(item => item.email === value).id;

  function deleteCustomer(rowData) {
    const valorId = state.values.find(item => item.email === rowData).id;
    return CustomersApi.removeCustomer(valorId).then(value => console.log(value.data));
  }

  return (
    <MaterialTable
      title={state.title}
      columns={state.columns}
      data={state.values}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
