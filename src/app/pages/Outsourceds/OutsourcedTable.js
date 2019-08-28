import React from 'react';

import MaterialTable from 'material-table';

export default function OutsourcedTable({ state, history }) {
  function getId(value) {
    const { id } = state.values.find(item => item.email === value);
    return id;
  }

  const tableActions = [
    {
      icon: 'edit',
      tooltip: 'Detalhes',
      onClick: (event, rowData) => history.push({
        pathname: '/app/edit-outsourced',
        state: { idOutsourced: getId(rowData.email) },
      }),
    },
    {
      icon: 'delete',
      tooltip: 'Remover',
      onClick: (event, rowData) => alert(rowData.email),
    },
  ];

  return (
    <MaterialTable
      title={state.title}
      columns={state.columns}
      data={state.values}
      actions={tableActions}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
