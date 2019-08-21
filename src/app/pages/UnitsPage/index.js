/* eslint-disable react/no-children-prop */
import React from 'react';
import CardBox from 'components/CardBox';
import { FormUnits } from './FormUnits';

export default function UnitsPage({ location }) {
  const { contractId, customerId } = location.state;

  const contractInfo = { contractId, customerId };

  return (
    <>
      <CardBox
        styleName="col-12"
        headerOutside={false}
        children={[<FormUnits contractInfo={contractInfo} />]}
        heading="Cadastro de unidades"
      />
    </>
  );
}
