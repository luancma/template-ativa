import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Footer = () => (
  <footer className="app-footer">
    <span className="d-inline-block">
      Copyright Safety System Technology &copy;
      {new Date().getFullYear()}
    </span>
  </footer>
);
export default Footer;
