import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchAllUser } from 'actions/User';
import { api } from 'api/api';
import TableUsers from './TableUsers';

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

export default function SimpleTable({ location, history }) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [contracts, setContracts] = useState([]);
  const userStore = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);

  useEffect(() => {
    if (userStore.users.length !== 0) setPosts(userStore.users);
  });

  useEffect(() => {
    api('contracts').then(value => setContracts(value.data.contracts));
  }, []);

  return (
    <>
      <TableUsers values={contracts} />
      {userStore.showLoading && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
