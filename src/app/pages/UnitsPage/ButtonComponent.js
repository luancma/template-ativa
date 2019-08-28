import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { UnitsApi } from 'api/UnitsApi';

export function ButtonComponent({ units }) {
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(3, units);
    if (
      units.city_id !== ''
      && units.description !== ''
      && units.outsourced_id !== ''
    ) {
      console.log(4, units);
      return setDisabled(false);
    }
    return setDisabled(true);
  });

  function handleCreateUnits(e) {
    e.preventDefault();
    UnitsApi.createNewUnit(units).then(value => console.log(value.data));
  }

  return (
    <Grid container direction="row" justify="flex-end">
      <Button
        size="large"
        onClick={e => handleCreateUnits(e)}
        variant="contained"
        color="primary"
        disabled={isDisabled}
      >
        Criar Unidade
      </Button>
    </Grid>
  );
}
