import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  OutlinedInput,
} from '@material-ui/core';

export function SelectStates({
  states,
  ValuesState,
  handleChangeSelect,
  isDisabled,
}) {
  const inputLabel = React.useRef(null);

  return (
    <FormControl disabled={isDisabled} fullWidth>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        Estado
      </InputLabel>
      <Select
        name="state"
        value={ValuesState}
        onChange={handleChangeSelect}
        input={<Input name="state" id="outlined-age-simple" />}
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
