/* eslint-disable eqeqeq */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContractsApi } from 'api/ContractsApi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import useFetch from 'app/hooks/useFetch';
import CardBox from 'components/CardBox';
import { CustomersApi } from 'api/CustomersApi';
import { Button } from '@material-ui/core';
import CircularProgress from 'components/CircularProgress';
import TableComponent from './TableComponent';
import { style } from './style';
import ContractDetails from '../../dumbs/CustomerInfo';

export default function SimpleTable({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];
  const { data: contractTeste } = useFetch(
    ContractsApi.getListOfContracts,
    'contracts'
  );

  const getSingle = () => CustomersApi.fetchSingleCustomers(routerParameter);

  const { data: singleCustomer } = useFetch(getSingle, 'customer');

  const tableState = {
    title: 'Contratos do cliente',
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
    return (
      <div className="loader-view">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <>
        <CardBox
          heading={
            <h6 className="MuiTypography-root MuiTypography-h6">
              Detalhes do cliente
            </h6>
          }
          styleName="col-12"
          children={<ContractDetails contractInfo={singleCustomer} />}
        />
        <div className="col-12">
          <div style={style.buttonStyle}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={e =>
                history.push(`/app/contrato/criar/${routerParameter}`)
              }
            >
              Adicionar Contrato
            </Button>
          </div>
          <TableComponent state={tableState} />
        </div>
      </>
      {message.isOpen && NotificationManager.error('Erro')}
      <NotificationContainer />
    </>
  );
}
