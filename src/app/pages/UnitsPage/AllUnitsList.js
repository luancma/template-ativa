import React from 'react';
import TableUsers from 'app/dumbs/TableUsers';
import { UnitsApi } from 'api/UnitsApi';
import useFetch from '../../hooks/useFetch';

export default function AllUnitsList({ history }) {
  const { data: units } = useFetch(UnitsApi.getListOfUnits, 'units');

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
    </>
  );
}
