import React, { useState, useEffect } from 'react';
import { SelectStates } from 'app/dumbs/SelectStates';
import { SelectCities } from 'app/dumbs/SelectCities';
import { masks } from 'util/masks';
import { TextField } from '@material-ui/core';
import validator from 'email-validator';
import { ButtonCreate } from './ButtonCreate';

export function FormCreateCustomer({
  states,
  handleChangeSelect,
  cityId,
  stateName,
  handleCreate,
  handleInput,
  objects,
}) {
  const { name, email, occupation, accountable, phone } = objects[1];

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <TextField
            value={name}
            name="name"
            fullWidth
            onChange={e => handleInput(e)}
            label="Nome completo"
          />
        </div>
        <div className="col-md-6">
          <TextField
            error={!validator.validate(email)}
            value={email}
            name="email"
            onChange={e => handleInput(e)}
            fullWidth
            label="Email"
          />
        </div>
        <div className="col-md-6">
          <TextField
            value={occupation}
            name="occupation"
            fullWidth
            onChange={e => handleInput(e)}
            label="Função"
          />
        </div>
        <div className="col-md-6">
          <TextField
            value={accountable}
            name="accountable"
            fullWidth
            onChange={e => handleInput(e)}
            label="Responsável"
          />
        </div>
        <div className="col-md-6">
          <TextField
            inputProps={{
              maxLength: 15,
            }}
            value={masks.mascararTel(phone)}
            name="phone"
            fullWidth
            onChange={e => handleInput(e)}
            label="Telefone"
          />
        </div>
        <div className="col-md-6">
          <SelectStates
            ValuesState={stateName}
            states={states}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="col-md-6">
          <SelectCities
            states={states}
            ValuesCity={cityId}
            stateName={stateName}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
      </div>
      <ButtonCreate handleCreate={handleCreate} objects={objects} />
    </>
  );
}
