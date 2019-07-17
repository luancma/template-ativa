import React, { useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

function CreateUser() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);

  const [state, setState] = React.useState({
    checkedCreate: false,
    checkedRead: false,
    checkedUpdate: false,
    checkedDelete: false
  });
  const [userEmail, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  const handleInputEmail = event => {
    setEmail(event.target.value);
  };

  const handleInputName = event => {
    setName(event.target.value);
  };

  const handleInputPassword = event => {
    setUserPassword(event.target.value);
  };

  const handleInputConfirmPassword = event => {
    setUserConfirmPassword(event.target.value);
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleCreateUser = () => {
    if (
      userName.trim() === "" ||
      userEmail.trim() === "" ||
      userPassword.trim() === "" ||
      userConfirmPassword.trim() === ""
    ) {
      alert("Todos os campos são obrigatórios");
    } else if (userPassword.trim() !== userConfirmPassword.trim()) {
      alert("As senhas não correspondem");
    } else {
      console.log("chamar criar usuario");
    }
  };

  const matches = useMediaQuery("(min-width:820px)");

  return (
    <Grid item xs={12} sm={12} container style={formControl}>
      {matches ? (
        <>
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
            label="Name"
            type="text"
            name="name"
            autoComplete="text"
            margin="normal"
            variant="outlined"
            value={userName}
            onChange={e => handleInputName(e)}
            style={textStyle}
          />
          <TextField
            id="outlined-email-input"
            label="Senha"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={userPassword}
            onChange={e => handleInputPassword(e)}
            style={textStyle}
          />
          <TextField
            id="outlined-email-input"
            label="Confirmar senha"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={userConfirmPassword}
            onChange={e => handleInputConfirmPassword(e)}
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
          <TextField
            id="outlined-email-input"
            label="Senha"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={userName}
            onChange={e => handleInputPassword(e)}
            style={textStyleSmall}
          />
          <TextField
            id="outlined-email-input"
            label="Confirmar senha"
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            value={userName}
            onChange={e => handleInputConfirmPassword(e)}
            style={textStyleSmall}
          />
          {/* <ButtonComponent state={state} handleCheck={handleChange} /> */}
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
