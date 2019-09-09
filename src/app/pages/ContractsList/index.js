import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Button } from '@material-ui/core';
import useFetch from 'app/hooks/useFetch';
import TableComponent from './TableComponent';
import CardBox from 'components/CardBox';

export default function SimpleTable({ location, history, match }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const { data: contractTeste } = useFetch(
    ContractsApi.getListOfContracts,
    'contracts'
  );

  const getSingle = () => ContractsApi.getASingleContract(routerParameter)

  const { data: singleContract } = useFetch(getSingle, 'contract')

  const tableState = {
    title: `Contratos`,
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
      <>
        <CardBox children={
          <div>
            <h1>Titular do contrato:</h1>
            <h1>Nome do contrato: </h1>
            <h1>Número do contrato: </h1>
          </div>}
        />
        <div className="col-12">
          <TableComponent state={tableState} />
        </div>
      </>
      )}
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}
