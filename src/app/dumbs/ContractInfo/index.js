import React from 'react';
import { style } from './style';

export default function ContractInfo({ contractInfo }) {
  return (
    <div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Nome do contrato:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.name}</strong>
        </span>
      </div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Número do contrato:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.number}</strong>
        </span>
      </div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Proprietário:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.customer.name}</strong>
        </span>
      </div>
    </div>
  );
}
