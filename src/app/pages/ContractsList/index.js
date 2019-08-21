import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button } from '@material-ui/core';
import ContractsList from './ContractsTable';

export default function SimpleTable({ location, history }) {
  const [tableState, setTableState] = useState({
    customerId: location.state.customerId,
    title: '',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'number' },
      { title: 'Cliente', field: 'customer.name' },
    ],
    values: [],
    tableActions: [
      {
        icon: 'visibility',
        tooltip: 'Unidades',
        onClick: (event, rowData) => history.push({
          pathname: '/app/units',
          state: {
            contractId: rowData.id,
            customerId: tableState.customerId,
          },
        }),
      },
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
      values: value.data.contracts.filter(
        contracts => contracts.customer.id === tableState.customerId && contracts
      ),
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
          <ContractsList state={tableState} />
          <Button
            style={{
              padding: '16px',
            }}
            variant="contained"
            color="primary"
            onClick={e => history.push({
              pathname: '/app/create-contract',
              state: { customerId: tableState.customerId },
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
