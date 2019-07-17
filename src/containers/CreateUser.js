import React, { useState } from "react";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@material-ui/core";
import Axios from "axios";

function CreateUser() {
  const [state, setState] = React.useState({
    checkedCreate: false,
    checkedRead: false,
    checkedUpdate: false,
    checkedDelete: false
  });
  const [userEmail, setEmail] = useState("");
  const [userName, setName] = useState("");

  const handleInputEmail = event => {
    setEmail(event.target.value);
  };

  const handleInputName = event => {
    setName(event.target.value);
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleCreateUser = () => {
    const trueValues = [];
    Object.keys(state).map(
      item => state[item] === true && trueValues.push(item)
    );

    if (trueValues.length === 0) {
      alert("Selecione um valor");
    } else {
      console.log("chamar função");
    }
  };

  const matches = useMediaQuery("(min-width:820px)");

  return (
    <Grid item xs={12} sm={12} container style={formControl}>
      {matches ? (
        <>
          {JSON.stringify(userEmail)}
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={textStyle}
            onChange={e => handleInputEmail(e)}
            value={userEmail}
          />
          <TextField
            id="outlined-email-input"
            label="Senha"
            type="password"
            name="password"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            value={userName}
            onChange={e => handleInputName(e)}
            style={textStyle}
          />

          <Button
            onClick={() => handleCreateUser()}
            color="primary"
            variant="contained"
            size="large"
            style={button}
          >
            Criar usuário
          </Button>
        </>
      ) : (
        <>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={e => handleInputEmail(e)}
            value={userEmail}
            style={textStyleSmall}
          />
          <TextField
            id="outlined-email-input"
            label="Senha"
            type="password"
            name="password"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            value={userName}
            onChange={e => handleInputName(e)}
            style={textStyleSmall}
          />
          <ButtonComponent state={state} handleCheck={handleChange} />
          <Button
            onClick={() => handleCreateUser()}
            color="primary"
            variant="contained"
            style={buttonSmall}
          >
            Criar usuário
          </Button>
        </>
      )}
    </Grid>
  );
}
export default CreateUser;

const ButtonComponent = props => {
  return (
    <FormGroup style={formControlSmall}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={props.state.checkedCreate}
            onChange={props.handleCheck("checkedCreate")}
            value="checkedCreate"
          />
        }
        label="Cadastrar"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={props.state.checkedRead}
            onChange={props.handleCheck("checkedRead")}
            value="checkedRead"
          />
        }
        label="Vizualizar"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={props.state.checkedUpdate}
            onChange={props.handleCheck("checkedUpdate")}
            value="checkedUpdate"
          />
        }
        label="Alterar"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={props.state.checkedDelete}
            onChange={props.handleCheck("checkedDelete")}
            value="checkedDelete"
          />
        }
        label="Remover"
      />
    </FormGroup>
  );
};

const formControl = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center"
};

const formControlSmall = {
  display: "flex",
  width: "70vw",
  justifyContent: "space-arround",
  padding: "15px"
};

const button = {
  width: "40vw",
  padding: "14px"
};

const buttonSmall = {
  width: "70vw",
  padding: "14px"
};

const textStyle = {
  width: "40vw"
};

const textStyleSmall = {
  width: "70vw"
};
