import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { receiveCustomers } from 'actions/Customers';
import { Link } from 'react-router-dom';
import Teste from './Teste';

function SamplePage({ history }) {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState([]);

  const customerStore = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(receiveCustomers());
  }, []);

  useEffect(() => {
    if (customerStore.customers.length !== 0) setCustomers(customerStore.customers);
  });

  const filterList = (value, valueFilter) => {
    value.filter(item => item.email !== valueFilter && setNewCustomers(item));
    console.log(newCustomers);
  };

  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
  });

  return (
    <MaterialTable
      title="Usuários"
      columns={state.columns}
      data={customers}
      actions={[
        {
          icon: 'visibility',
          tooltip: 'Detalhes',
          onClick: () => history.push('/app/users'),
        },
        {
          icon: 'delete',
          tooltip: 'Remover',
          onClick: (event, rowData) => filterList(customers, rowData.email),
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            const data = [...customers];
            data[data.indexOf(oldData)] = newData;
            setState({ ...state, data });
          }, 600);
        }),
        onRowDelete: oldData => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            const data = [...customers];
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

export default SamplePage;
