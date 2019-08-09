import React from 'react';
import MaterialTable from 'material-table';

export default function ContractsList({ state }) {
  const valuesTable = state.values.filter(
    item => item.customer.id === state.idCustomer && item
  );

  return (
    <MaterialTable
      title={state.title}
      columns={state.columns}
      data={valuesTable}
      actions={state.tableActions}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
