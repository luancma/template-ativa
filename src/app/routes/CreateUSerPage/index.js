import React from "react";
import { Input, Paper, Card, Container } from "@material-ui/core";

const style = {
  Container: {
    marginTop: "80px"
  },

  inputLavbel: {
    marginTop: "20px"
  }
};

export default function index() {
  return (
    <Container style={style.Container}>
      <div className="row">
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            size="24px"
            placeholder="Name"
            className="w-100"
            inputProps={{ "aria-label": "User name" }}
          />
        </div>
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            placeholder="Email"
            className="w-100"
            inputProps={{ "aria-label": "Description" }}
          />
        </div>
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            placeholder="Confirm Email"
            className="w-100"
            inputProps={{ "aria-label": "Description" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            size="24px"
            placeholder="Name"
            className="w-100"
            inputProps={{ "aria-label": "User name" }}
          />
        </div>
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            placeholder="Email"
            className="w-100"
            inputProps={{ "aria-label": "Description" }}
          />
        </div>
        <div className="col-md-4 col-12">
          <Input
            style={{ padding: "10px" }}
            placeholder="Confirm Email"
            className="w-100"
            inputProps={{ "aria-label": "Description" }}
          />
        </div>
      </div>
    </Container>
  );
}
