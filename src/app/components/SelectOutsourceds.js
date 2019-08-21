import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  OutlinedInput,
} from '@material-ui/core';

export function SelectOutsourceds({
  outsourceds,
  ValuesState,
  handleChangeSelect,
}) {
  const inputLabel = React.useRef(null);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      style={{ margin: '14px 0 14px ' }}
    >
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        Terceirizada
      </InputLabel>
      <Select
        name="outsourced"
        value={ValuesState}
        onChange={handleChangeSelect}
        input={<Input name="state" id="outlined-age-simple" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {outsourceds
          && outsourceds.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.fantasy_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
