import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';

export function SelectStates({
  states,
  ValuesState,
  handleChangeSelect,
  isDisabled,
}) {
  console.log(isDisabled);

  return (
    <FormControl variant="outlined" disabled={isDisabled}>
      <InputLabel htmlFor="outlined-age-simple">Estado</InputLabel>
      <Select
        name="state"
        value={ValuesState}
        onChange={handleChangeSelect}
        input={<OutlinedInput name="state" id="outlined-age-simple" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {states
          && states.map(item => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
