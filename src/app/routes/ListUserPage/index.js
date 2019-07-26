import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, InputLabel } from '@material-ui/core';
import { UsersApi } from 'api/UsersApi';
import { fetchAllUser } from 'actions/User';

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

  const teste = query === ''
    ? posts
    : posts.filter(res => res.name.toLowerCase().includes(query.toLocaleLowerCase()));

  const classes = useStyles();
  return (
    <>
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

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length !== 0 && teste.map(item => (
              <TableRow key={item.id}>
                <TableCell align="left" component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="left">{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {userStore.showLoading && (
      <div className="loader-view">
        <CircularProgress />
      </div>
      )}
    </>
  );
}
