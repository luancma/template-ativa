import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import TableUsers from '../../components/TableUsers';
import { useStyles } from '../CreateCustomer/stylesDevices';

export default function SimpleTable({ location, history }) {
  const [tableState, setTableState] = useState({
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Email', field: 'email' },
    ],
    values: [],
    tableActions: [
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
    ],
  });
  const [message, setMessage] = useState({
    isOpen: false,
  });

  useEffect(() => {
    ContractsApi.getListOfContracts().then(value => setTableState({
      ...tableState,
      title: 'Contratos',
      values: value.data.contracts,
    }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage({ isOpen: false });
    }, 3000);
  }, [message]);

  return (
    <>
      {tableState.title && <TableUsers state={tableState} />}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}
