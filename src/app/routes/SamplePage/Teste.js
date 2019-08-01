import React from 'react';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';

export default function Teste() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      {
        name: 'Mehmet',
        surname: 'Baran',
        birthYear: 1987,
        birthCity: 63,
      },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <MaterialTable
      style={{ padding: '35px' }}
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            const data = [...state.data];
            data[data.indexOf(oldData)] = newData;
            setState({ ...state, data });
          }, 600);
        }),
        onRowDelete: oldData => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            const data = [...state.data];
            data.splice(data.indexOf(oldData), 1);
            setState({ ...state, data });
          }, 600);
        }),
      }}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
