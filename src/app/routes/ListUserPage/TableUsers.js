import React from 'react';

import {
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from '@material-ui/core';
// import { Container } from './styles';
export default function TableUsers({ handleFilter, posts }) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Email</TableCell>
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
    </div>
  );
}
