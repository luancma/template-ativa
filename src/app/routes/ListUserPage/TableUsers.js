import React, { useState } from 'react';

import MaterialTable from 'material-table';

export default function TableUsers({ posts, history }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
  });
  return (
    <MaterialTable
      title="Contratos"
      columns={state.columns}
      data={posts}
      actions={[
        {
          icon: 'visibility',
          tooltip: 'Detalhes',
          onClick: () => history.push('/app/users'),
        },
        {
          icon: 'delete',
          tooltip: 'Remover',
          onClick: (event, rowData) => alert(rowData.email),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
