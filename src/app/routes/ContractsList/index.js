import React, { useEffect, useState } from 'react';

import {
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableBody,
} from '@material-ui/core';
// import { Container } from './styles';
import { ContractsApi } from '../../../api/ContractsApi';

export default function ContractsList({ handleFilter, posts }) {
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    const fetchContracts = async () => ContractsApi.getListOfContracts().then(value => setContracts(value.data.contracts));
    fetchContracts();
  }, []);

  const tableLabels = ['Nome', 'Número', 'Cliente'];

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {tableLabels.map(trow => (
              <TableCell align="left" key={trow}>
                {trow}
              </TableCell>
            ))}
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
    </div>
  );
}
