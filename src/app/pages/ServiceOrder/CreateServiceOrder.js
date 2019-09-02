import React from 'react';
import CardBox from 'components/CardBox';

export default function CreateServiceOrder() {
  return (
    <CardBox
      heading={<Heading />}
      styleName="col-12"
      children={
        <>
          <h1>Teste</h1>
        </>
      }
    />
  );
}
function Heading() {
  return (
    <div className="col-12">
      <span>Criar Ordem de Serviço</span>
    </div>
  );
}
