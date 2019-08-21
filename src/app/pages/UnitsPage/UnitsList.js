import React, { useEffect, useState } from 'react';
import TableUsers from 'app/components/TableUsers';
import { UnitsApi } from 'api/UnitsApi';

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  useEffect(
    () => UnitsApi.getListOfUnits().then(value => setUnits(value.data.units)),
    []
  );

  const state = {
    title: 'Lista de Unidades',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'contract.number' },
      { title: 'Cidade', field: 'city.name' },
    ],
    values: units,
  };

  return <TableUsers state={state} />;
}
