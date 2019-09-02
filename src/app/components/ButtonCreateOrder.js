import React from 'react';
import { Button } from '@material-ui/core';

export default function ButtonCreateOrder({ history }) {
  const createServiceOrder = () => history.push('/app/ordem/criar');
  return (
    <div className="col-md-12" style={styleComponent}>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={e => createServiceOrder(e)}
      >
        Cadastrar ordem de serviço
      </Button>
    </div>
  );
}

const styleComponent = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};
