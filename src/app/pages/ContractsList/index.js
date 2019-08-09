import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button } from '@material-ui/core';
import ContractsList from './ContractsTable';
import { useStyles } from '../CreateCustomer/stylesDevices';

export default function SimpleTable({ location, history }) {
  const [tableState, setTableState] = useState({
    idCustomer: location.state.customerId,
    title: 'Contratods',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'number' },
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
      {tableState.values.length && (
        <>
          <ContractsList state={tableState} />

          <Button
            style={{
              padding: '16px',
            }}
            variant="contained"
            color="primary"
            onClick={e => history.push({
              pathname: '/app/create-contract',
              state: { customerId: tableState.idCustomer },
            })
            }
          >
            Adicionar Contrato
          </Button>
        </>
      )}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}
