import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@material-ui/core';
import { useStyles } from './stylesDevices';

export default function SelectButtons({
  values,
  styleForm,
  handleChangeSelect,
  states,
  cities,
}) {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <div className={styleForm}>
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
      <FormControl variant="outlined" className={classes.formSelect}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Cidade
        </InputLabel>
        <Select
          value={values.city}
          onChange={handleChangeSelect}
          input={(
            <OutlinedInput
              labelWidth={labelWidth}
              name="city"
              id="outlined-age-simple"
            />
)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities
            && cities.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
