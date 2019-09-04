import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button } from '@material-ui/core';
import useFetch from 'app/hooks/useFetch';
import TableComponent from './TableComponent';

export default function SimpleTable({ location, history, match }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const { data: contractTeste } = useFetch(
    ContractsApi.getListOfContracts,
    'contracts'
  );

  const tableState = {
    title: 'Contratos',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'number' },
      { title: 'Cliente', field: 'customer.name' },
    ],
    values: contractTeste.filter(
      item => item.customer.id == routerParameter && item
    ),
    tableActions: [
      {
        icon: 'visibility',
        tooltip: 'Unidades',
        onClick: (event, rowData) =>
          history.push(`/app/unidades/lista/${rowData.id}`),
      },
      {
        icon: 'delete',
        tooltip: 'Remover',
        onClick: (event, rowData) => alert(rowData.id),
      },
    ],
  };

  const [message, setMessage] = useState({
    isOpen: false,
  });

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
          <ButtonCreate history={history} index={routerParameter} />
        </>
      )}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}

function ButtonCreate({ history, index }) {
  return (
    <div className="row">
      <div
        className="col-12 col-md-12"
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginTop: '14px',
        }}
      >
        <Button
          className="col-md-4 col-lg-3 col-12"
          size="large"
          variant="contained"
          color="primary"
          onClick={e => history.push(`/app/contrato/criar/${index}`)}
        >
          Adicionar Contrato
        </Button>
      </div>
    </div>
  );
}
