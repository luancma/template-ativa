import React from 'react';
import { Button } from '@material-ui/core';

export default function ButtonCreate({ validateButton, handleSubmit }) {
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '20px',
  };
  return (
    <div className="row">
      <div className="col-md-12" style={buttonStyle}>
        <Button
          size="large"
          type="submit"
          value="Submit"
          color="primary"
          variant="contained"
          disabled={validateButton()}
          onClick={e => handleSubmit()}
        >
          Criar usuario
        </Button>
      </div>
    </div>
  );
}
