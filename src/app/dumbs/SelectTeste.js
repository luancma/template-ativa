import React, { useEffect, useState } from 'react';
import {
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

export function SelectTeste({ handleChangeSelect, valuesCity }) {
  return (
    <FormControl disabled fullWidth>
      <InputLabel htmlFor="name-disabled">Cidade</InputLabel>
      <Select
        value={valuesCity}
        onChange={handleChangeSelect}
        input={<Input name="city" id="name-disabled" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {valuesCity && <MenuItem value={valuesCity}>{valuesCity}</MenuItem>}
      </Select>
    </FormControl>
  );
}
