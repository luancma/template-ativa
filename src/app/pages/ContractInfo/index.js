import React, { useState } from 'react';
import CardBox from 'components/CardBox';
import useFetch from 'app/hooks/useFetch';
import { ContractsApi } from 'api/ContractsApi';
import TableComponent from '../ContractsList/TableComponent';
import { UnitsApi } from 'api/UnitsApi';
import { Button } from '@material-ui/core';

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
        onClick: (event, rowData) => history.push(`/app/unidades/lista/${rowData.id}`),

      },
    ],
  }

  if(contractInfo.length === 0){
    return <h1>Loading</h1>
  }

  return (
    <>
      <CardBox
        styleName="col-12"
        heading={
          <h6 class="MuiTypography-root MuiTypography-h6">Detalhes do contrato</h6>
        }
        children={<ContractDetails contractInfo={contractInfo} />}
      />
      <div className="col-12">
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 20px 20px" }}>
          <Button size="large" variant="contained" color="primary" onClick={e => history.push(`/app/unidades/criar/${routerParameter}`)}>Adicionar Unidade</Button>
        </div>
        <TableComponent state={tableState} />
      </div>
    </>
  );
}

function ContractDetails({ contractInfo }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start ',
        }}
      >
        <span style={{ fontSize: '16px' }}>Nome do contrato:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.name}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start ',
        }}
      >
        <span style={{ fontSize: '16px' }}>Número do contrato:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.number}</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: '16px' }}>Proprietário:</span>
        <span style={{ fontSize: '16px' }}>{contractInfo.customer.name}</span>
      </div>
    </div>
  );
}
