import React, { useEffect } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { hiddenMessageError } from 'actions';

export default function HandleErrosMessage() {
  const errorValue = useSelector(state => state.formErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorValue) {
      setTimeout(() => {
        dispatch(hiddenMessageError(''));
      }, 100);
    }
  });

  return (
    <>
      {errorValue.visible && NotificationManager.error(errorValue.message)}
      <NotificationContainer />
    </>
  );
}
