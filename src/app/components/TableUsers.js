import React from 'react';
import MaterialTable from 'material-table';

export default function TableUsers({ state, history }) {
  return (
    <>
      <MaterialTable
        title={state.title}
        columns={state.columns}
        data={state.values}
        actions={state.tableActions}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
}
