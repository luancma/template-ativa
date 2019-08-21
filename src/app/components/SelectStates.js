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
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      disabled={isDisabled}
      variant="outlined"
      fullWidth
      style={{ margin: '14px 0 14px ' }}
    >
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        Estado
      </InputLabel>
      <Select
        name="state"
        value={ValuesState}
        onChange={handleChangeSelect}
        input={(
          <Input
            labelWidth={labelWidth}
            name="state"
            id="outlined-age-simple"
          />
)}
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
