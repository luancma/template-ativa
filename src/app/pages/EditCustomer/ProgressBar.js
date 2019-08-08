import React from 'react';
import { LinearProgress } from '@material-ui/core';

export default function ProgressBar() {
  return (
    <div style={{ flexGrow: 1 }}>
      <LinearProgress variant="query" />
    </div>
  );
}
