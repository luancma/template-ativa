/* eslint-disable react/no-children-prop */
import React from 'react';

import CardBox from 'components/CardBox';

import { FormUpdate } from './FormUpdate';

export default function UnitsPage({ history }) {
  return (
    <CardBox styleName="col-12" children={<FormUpdate history={history} />} />
  );
}
