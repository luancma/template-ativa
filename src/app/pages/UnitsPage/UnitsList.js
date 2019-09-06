import React, { useEffect, useState } from 'react';
import TableUsers from 'app/components/TableUsers';
import { UnitsApi } from 'api/UnitsApi';
import { Button } from '@material-ui/core';
import useFetch from 'app/hooks/useFetch';
import { ContractsApi } from 'api/ContractsApi';

export default function UnitsPage({ history }) {
  const routerParameter = history.location.pathname.split('/').slice(-1)[0];
  const { data: unitsData } = useFetch(UnitsApi.getListOfUnits, 'units');
  const contractInfo = async () => await ContractsApi.getASingleContract(routerParameter)
  const { data: customerData } = useFetch(contractInfo, 'contract');




  const state = {
    title: `Lista de unidades: ${customerData.name}`,
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'contract.number' },
      { title: 'Cidade', field: 'city.name' },
    ],
    values: unitsData.filter(item => item.contract.id == routerParameter),
    tableActions: [
      {
        icon: 'visibility',
        tooltip: 'Detalhes',
        onClick: (event, rowData) =>
          history.push({
            pathname: `/app/ordem/${routerParameter}/detalhes`,
            state: { unitId: rowData.id },
          }),
      },
      {
        icon: 'edit',
        tooltip: 'Editar',
        onClick: (event, rowData) =>
          history.push({
            pathname: `/app/unidades/editar/${rowData.id}`,
            state: { unitId: rowData.id },
          }),
      },
      {
        icon: 'delete',
        tooltip: 'Remover',
        onClick: (event, rowData) =>
          UnitsApi.deleteUnit(rowData.id).then(() => alert('Deletado')),
      },
    ],
  };

  if (!state && !customerData) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <TableUsers state={state} />
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
            onClick={e =>
              history.push({
                pathname: `/app/unidades/criar/${routerParameter}`,
              })
            }
          >
            Criar unidade
          </Button>
        </div>
      </div>
    </div>
  );
}
