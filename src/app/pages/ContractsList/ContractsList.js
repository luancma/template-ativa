import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import ContainerHeader from 'components/ContainerHeader';
import TableComponent from './TableComponent';

export default function ContractsList({ history, match }) {
  const [tableState, setTableState] = useState({
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'number' },
      { title: 'Cliente', field: 'customer.name' },
    ],
    values: [],
    tableActions: [
      {
        icon: 'delete',
        tooltip: 'Remover',
        onClick: (event, rowData) => alert(rowData.id),
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
      {tableState.values && (
        <>
          <TableComponent state={tableState} />
        </>
      )}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}
