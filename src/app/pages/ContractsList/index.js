/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import useFetch from 'app/hooks/useFetch';
import CardBox from 'components/CardBox';
import { CustomersApi } from 'api/CustomersApi';
import MaterialTable from 'material-table';
import TableComponent from './TableComponent';

export default function SimpleTable({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const { data: contractTeste } = useFetch(
    ContractsApi.getListOfContracts,
    'contracts'
  );

  const getSingle = () => CustomersApi.fetchSingleCustomers(routerParameter);

  const { data: singleCustomer } = useFetch(getSingle, 'customer');

  const tableState = {
    title: `Contratos do usuário `,
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
          history.push(`/app/contrato/detalhes/${rowData.id}`),
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

  if (!singleCustomer.name) {
    return <h1>Carregando</h1>;
  }

  return (
    <>
      <>
        <CardBox
          heading={
            <h6 className="MuiTypography-root MuiTypography-h6">
              Informações do cliente
            </h6>
          }
          styleName="col-12"
          children={<ContractInfo contractInfo={singleCustomer} />}
        />
        <div className="col-12">
          <TableComponent state={tableState} />
        </div>
      </>
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}

function ContractInfo({ contractInfo }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start ',
        }}
      >
        <span style={{ fontSize: '16px' }}>Nome do cliente:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.name}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start ',
        }}
      >
        <span style={{ fontSize: '16px' }}>Email do cliente:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.email}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: '16px' }}>Função:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.occupation}</span>
      </div>
    </div>
  );
}
