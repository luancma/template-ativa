import React from 'react';
import {
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from '@material-ui/core';

export default function ContractTable({ contracts }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <span style={{ fontSize: '18px' }}>Nome</span>
          </TableCell>
          <TableCell align="left">
            <span style={{ fontSize: '18px' }}>Número</span>
          </TableCell>
          <TableCell align="left">
            <span style={{ fontSize: '18px' }}>Proprietário</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contracts.length !== 0
          && contracts.map(item => (
            <TableRow key={item.id}>
              <TableCell align="left" component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {item.number}
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {item.customer.name}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
