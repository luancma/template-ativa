import React, { useEffect, useState } from 'react';
import { OutsourcedsApi } from 'api/OutsourcedsApi';

import { Button, Grid } from '@material-ui/core';
import OutsourcedTable from './OutsourcedTable';
import { outsourcedStyle } from './stylesComponent';

function Outsourceds({ history }) {
  const [tableState, setTableState] = useState({
    title: 'Contratods',
    columns: [
      { title: 'Nome fantasia', field: 'social_name' },
      { title: 'CNPJ', field: 'cnpj' },
    ],
    values: [],
  });

  const [message, setMessage] = useState({
    isOpen: false,
  });

  useEffect(() => {
    OutsourcedsApi.getListOfOutsourceds().then(value => setTableState({
      ...tableState,
      title: 'Terceirizados',
      values: value.data.outsourceds,
    }));
  }, []);

  return (
    <>
      <OutsourcedTable history={history} state={tableState} />
      <Button
        onClick={e => history.push({
          pathname: '/app/create-outsourced',
        })
        }
      >
        Criar outsourced
      </Button>
    </>
  );
}
export default Outsourceds;
