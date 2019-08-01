import React from 'react';

import {
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from '@material-ui/core';

export default function TableUsers({ handleFilter, posts }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <span style={{ fontSize: '18px' }}>Nome</span>
          </TableCell>
          <TableCell align="left">
            <span style={{ fontSize: '18px' }}>Email</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.length !== 0
          && handleFilter.map(item => (
            <TableRow key={item.id}>
              <TableCell align="left" component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="left">{item.email}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}