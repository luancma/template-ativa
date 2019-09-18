import React from 'react';
import { style } from './style';

export default function index({ contractInfo }) {
  return (
    <div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Nome do cliente:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.name}</strong>
        </span>
      </div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Email do cliente:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.email}</strong>
        </span>
      </div>
      <div style={style.elementContainer}>
        <span style={style.titles}>Função:</span>
        <span style={style.propsValues}>
          <strong>{contractInfo.occupation}</strong>
        </span>
      </div>
    </div>
  );
}
