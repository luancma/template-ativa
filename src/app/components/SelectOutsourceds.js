import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';

export function SelectOutsourceds({
  outsourceds,
  ValuesState,
  handleChangeSelect,
  isDisabled,
}) {
  console.log(isDisabled);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-age-simple">Outsourceds</InputLabel>
      <Select
        name="outsourced"
        value={ValuesState}
        onChange={handleChangeSelect}
        input={<OutlinedInput name="state" id="outlined-age-simple" />}
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
