import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button } from '@material-ui/core';
import ContainerHeader from 'components/ContainerHeader';
import TableComponent from './TableComponent';

export default function SimpleTable({ location, history, match }) {
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
          pathname: `/app/unidades/lista/${location.state.customerId}`,
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

  console.log(history.location);
  return (
    <>
      {tableState.values && (
        <>
          <TableComponent state={tableState} />
          <ButtonCreate history={history} tableState={tableState} />
        </>
      )}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}

function ButtonCreate({ history, tableState }) {
  return (
    <Button
      style={{
        padding: '16px',
      }}
      variant="contained"
      color="primary"
      onClick={e => history.push({
        pathname: '/app/contrato/criar',
        state: { customerId: tableState.customerId },
      })
      }
    >
      Adicionar Contrato
    </Button>
  );
}
