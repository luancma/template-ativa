import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { UnitsApi } from 'api/UnitsApi';

export function ButtonComponent({ units, history }) {
  const [isDisabled, setDisabled] = useState(true);

  function handleCreateUnits() {
    UnitsApi.createNewUnit(units).then(value => history.goBack());

    setDisabled(false);
  }

  return (
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
          onClick={e => handleCreateUnits()}
        >
          Criar unidade
        </Button>
      </div>
    </div>
  );
}
