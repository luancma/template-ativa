import React from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';

export default function index() {
  const errorValue = useSelector(state => state.formErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorValue) {
      setTimeout(() => {
        dispatch(hiddenMessageError(''));
      }, 2000);
    }
  });

  return (
    <>
      {errorValue.visible && NotificationManager.success(errorValue.message)}
      <NotificationContainer />
    </>
  );
}
