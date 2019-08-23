import React, { useEffect, useState } from 'react';
import TableUsers from 'app/components/TableUsers';
import { UnitsApi } from 'api/UnitsApi';
import { Button } from '@material-ui/core';

export default function UnitsPage({ history }) {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    UnitsApi.getListOfUnits().then(value => setUnits(value.data.units));
  }, []);

  const state = {
    title: 'Lista de Unidades',
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Contrato nº', field: 'contract.number' },
      { title: 'Cidade', field: 'city.name' },
    ],
    values: units,
  };

  return (
    <>
      <Button onClick={e => history.goBack()}>Voltar</Button>
      <TableUsers state={state} />
    </>
  );
}
