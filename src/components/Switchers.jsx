import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default function SwitchesGroup() {
  const [state, setState] = React.useState({
    nmode: false,
    difficulty: false,
    design: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Game settings</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.gilad} onChange={handleChange} name="nmode" />}
          label="Night mode"
        />
        <FormControlLabel
          control={<Switch checked={state.jason} onChange={handleChange} name="difficulty" />}
          label="Hard mode"
        />
        <FormControlLabel
          control={<Switch checked={state.antoine} onChange={handleChange} name="design" />}
          label="Cards Design"
        />
      </FormGroup>
      <FormHelperText></FormHelperText>
    </FormControl>
  );
}
