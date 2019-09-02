import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { receiveContracts } from 'actions/Contracts';
import ContractTable from './ContractTable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

export default function ContractsList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const contractStore = useSelector(state => state.contracts);

  useEffect(() => {
    const fetchContracts = async () => dispatch(await receiveContracts());
    fetchContracts();
  }, []);

  return (
    <>
      {contractStore.showLoading && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      <Paper className={classes.root}>
        {contractStore.contracts.length && (
          <ContractTable contracts={contractStore.contracts} />
        )}
      </Paper>
    </>
  );
}
