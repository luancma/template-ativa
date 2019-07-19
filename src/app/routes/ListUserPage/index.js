import React, { useEffect } from 'react';
import {
  Container, Button, MySnackbarContentWrapper, Snackbar, IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { hideMessageSuccess, hideMessageFaild} from '../../../actions/User';


function ListUserPage() {
  const useStyles = makeStyles(theme => ({
    close: {
      padding: theme.spacing(0.5),
    },
  }));

  const dispatch = useDispatch();
  const userMessage = useSelector(state => state.user);

  useEffect(() => {
    if (userMessage.showMessageSuccess) {
      dispatch(hideMessageSuccess());
    }
  });

  useEffect(() => {
    if (userMessage.showMessageFaild) {
      dispatch(hideMessageFaild());
    }
  });

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <h1>teste</h1>
    </div>
  );
}
export default ListUserPage;
