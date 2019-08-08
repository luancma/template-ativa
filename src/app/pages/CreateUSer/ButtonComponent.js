import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const ButtonComponent = ({state, style, handleCheck}) => (

  <FormGroup style={style}>
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
          checked={state.checkedCreate}
          onChange={handleCheck('checkedCreate')}
          value="checkedCreate"
            />
    )}
      label="Cadastrar"
      />
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
          checked={state.checkedRead}
          onChange={handleCheck('checkedRead')}
          value="checkedRead"
            />
    )}
      label="Vizualizar"
        />
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
          checked={state.checkedUpdate}
          onChange={handleCheck('checkedUpdate')}
          value="checkedUpdate"
            />
    )}
      label="Alterar"
        />
    <FormControlLabel
      control={(
        <Checkbox
          color="primary"
          checked={state.checkedDelete}
          onChange={handleCheck('checkedDelete')}
          value="checkedDelete"
            />
    )}
      label="Remover"
        />
  </FormGroup>
);
export default ButtonComponent;
