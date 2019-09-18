/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import CardBox from 'components/CardBox';
import useFetch from 'app/hooks/useFetch';
import { ContractsApi } from 'api/ContractsApi';
import { UnitsApi } from 'api/UnitsApi';
import { Button } from '@material-ui/core';
import CircularProgress from 'components/CircularProgress';
import ContractDetailsComponent from '../../dumbs/ContractInfo/index';
import TableComponent from '../ContractsList/TableComponent';

export default function ContractInfo({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const { data: unitsData } = useFetch(UnitsApi.getListOfUnits, 'units');

  const getContract = () => ContractsApi.getASingleContract(routerParameter);

  const { data: contractInfo } = useFetch(getContract, 'contract');

  const tableState = {
    title: 'Unidades do contrato',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'number' },
      { title: 'Cliente', field: 'customer.name' },
    ],
    values: unitsData.filter(item => item.contract.id == routerParameter),
    tableActions: [
      {
        icon: 'visibility',
        tooltip: 'Detalhes',
        onClick: (event, rowData) =>
          history.push(`/app/unidades/lista/${rowData.id}`),
      },
    ],
  };

  if (contractInfo.length === 0) {
    return (
      <div className="loader-view">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <CardBox
        styleName="col-12"
        heading={
          <h6 className="MuiTypography-root MuiTypography-h6">
            Detalhes do contrato
          </h6>
        }
        children={<ContractDetailsComponent contractInfo={contractInfo} />}
      />
      <div className="col-12">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '0 0 20px 20px',
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={e =>
              history.push(`/app/unidades/criar/${routerParameter}`)
            }
          >
            Adicionar Unidade
          </Button>
        </div>
        <TableComponent state={tableState} />
      </div>
    </>
  );
}
