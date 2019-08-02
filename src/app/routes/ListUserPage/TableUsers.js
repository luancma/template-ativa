import React, { useState } from 'react';

import MaterialTable from 'material-table';
import { Label } from '@amcharts/amcharts4/core';
import { masks } from 'util/masks';

export default function TableUsers({ values, history }) {
  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
  });

  return (
    <>
      <MaterialTable
        title="Contratos"
        columns={state.columns}
        data={values}
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
    </>
  );
}
