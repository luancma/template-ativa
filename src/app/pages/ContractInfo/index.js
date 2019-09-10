import React from 'react';
import CardBox from 'components/CardBox';
import MaterialTable from 'material-table';

import useFetch from 'app/hooks/useFetch';
import { ContractsApi } from 'api/ContractsApi';

export default function ContractInfo({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];

  const getContract = () => ContractsApi.getASingleContract(routerParameter);

  const { data: contractInfo } = useFetch(getContract, 'contract');

  if (!contractInfo.id) {
    return <h1>Carregando</h1>;
  }

  return (
    <CardBox
      styleName="col-12"
      heading={
        <h6
          style={{
            fontSize: '1.5rem',
            fontWeight: '500',
            lineHeight: '1.6',
            letterSpacing: '0.0075em',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Detelhes do contrato
        </h6>
      }
      children={<ContractDetails contractInfo={contractInfo} />}
    />
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
