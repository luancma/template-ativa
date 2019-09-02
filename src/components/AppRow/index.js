import React from 'react';

const AppRow = ({ styleName, children }) => (
  <div className="row">
    <div className={`${styleName}`}>{children}</div>
  </div>
);

export default AppRow;
