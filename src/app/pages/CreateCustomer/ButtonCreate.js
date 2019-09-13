import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { UnitsApi } from 'api/UnitsApi';

export function ButtonCreate({ objects, handleCreate }) {
  const [isDisabled, setDisabled] = useState(true);
  const { accountable, email, name, occupation, phone } = objects[1];

  const { state, city } = objects[0];

  useEffect(() => {
    if (
      accountable !== '' &&
      email !== '' &&
      name !== '' &&
      occupation !== '' &&
      phone !== '' &&
      state !== '' &&
      city !== ''
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  });

  function handleCreateUnits(e) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <Grid container direction="row" justify="flex-end">
      <Button
        size="large"
        onClick={e => handleCreate(e)}
        variant="contained"
        color="primary"
        disabled={isDisabled}
      >
        Adicionar Cliente
      </Button>
    </Grid>
  );
}
