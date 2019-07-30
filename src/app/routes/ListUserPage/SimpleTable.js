import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, InputLabel } from '@material-ui/core';
import { fetchAllUser } from 'actions/User';
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

export default function SimpleTable() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const userStore = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);

  useEffect(() => {
    if (userStore.users.length !== 0) setPosts(userStore.users);
  });

  const handleFilterValue = (event) => {
    setQuery(event.target.value);
  };

  const handleFilterByQuerry = query === ''
    ? posts
    : posts.filter(res => res.name.toLowerCase().includes(query.toLocaleLowerCase()));

  return (
    <>
      {userStore.showLoading && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      <Paper className={classes.root}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">Filtrar usuários</InputLabel>
          <Input
            id="adornment-amount"
            value={query}
            onChange={e => handleFilterValue(e)}
            startAdornment={(
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
)}
          />
        </FormControl>
        <TableUsers posts={posts} handleFilter={handleFilterByQuerry} />
      </Paper>
    </>
  );
}
