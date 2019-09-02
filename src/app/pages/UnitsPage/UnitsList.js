import React, { useEffect, useState } from 'react';
import TableUsers from 'app/components/TableUsers';
import { UnitsApi } from 'api/UnitsApi';
import { Button } from '@material-ui/core';

export default function UnitsPage({ history }) {
  const { contractId, customerId } = history.location.state;

  const [units, setUnits] = useState([]);

  const thisRequest = async () =>
    UnitsApi.getListOfUnits().then(value =>
      value.data.units.filter(i => i.contract.id === contractId && i)
    );

  async function teste() {
    const teste = await thisRequest();
    await setUnits(teste);
  }

  useEffect(() => {
    teste();
  }, []);

  const state = {
    title: 'Lista de Unidades',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'contract.number' },
      { title: 'Cidade', field: 'city.name' },
    ],
    values: units,
    tableActions: [
      {
        icon: 'visibility',
        tooltip: 'Detalhes',
        onClick: (event, rowData) =>
          history.push({
            pathname: `/app/ordem/${contractId}/detalhes`,
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

  return (
    <>
      <TableUsers state={state} />
      <Button
        onClick={() => {
          history.push(`/app/unidades/criar/${contractId}`);
        }}
      >
        Criar unidade
      </Button>
    </>
  );
}
