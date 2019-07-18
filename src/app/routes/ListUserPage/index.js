import React, { useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { hideMessageSuccess, hideMessageFaild } from '../../../actions/User';


function ListUserPage() {
  const dispatch = useDispatch();
  const userMessage = useSelector(state => state.user);

  useEffect(() => {
    if (userMessage.showMessageFaild) {
      setTimeout(() => {
        dispatch(hideMessageFaild());
      }, 100);
    }
    if (userMessage.showMessage) {
      setTimeout(() => {
        dispatch(hideMessageSuccess());
      }, 100);
    }
  }, []);

  return (
    <Container>
      {userMessage.showMessage && NotificationManager.success(userMessage.alertMessage)}
      {userMessage.showMessageFaild && NotificationManager.error(userMessage.alertMessage)}
      <NotificationContainer />
    </Container>
  );
}
export default ListUserPage;
