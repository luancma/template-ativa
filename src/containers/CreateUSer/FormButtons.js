import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { OutlinedInput } from '@material-ui/core';
import { api } from 'api/api';

export default function FormButtons() {
  const [states, setStates] = useState([]);
  const [values, setValues] = React.useState({
    state: '',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    api('states').then(value => setStates(value.data.states));
  }, []);

  return (
    <div
      style={{
        width: '40vw',
        marginBottom: '14px',
      }}
    >
      <FormControl variant="outlined" className={classes.formSelect}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Estado
        </InputLabel>
        <Select
          value={values.state}
          onChange={handleChangeSelect}
          input={(
            <OutlinedInput
              labelWidth={labelWidth}
              name="state"
              id="outlined-age-simple"
            />
)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {states !== 0
            && states.map(item => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
