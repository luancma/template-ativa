import React, { useState, useEffect } from 'react';
import { CustomersApi } from 'api/CustomersApi';
import { Grid, useMediaQuery } from '@material-ui/core';
import validator from 'email-validator';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { LargeDevices } from './LargeDevices';
import { SmallDevices } from './SmallDevices';
import ProgressBar from './ProgressBar';
import { useStyle } from './editStyles';

export default function EditCustomer({ location, history }) {
  const { customerId } = location.state;
  const [customer, setCustomer] = useState([]);
  const [message, setMessage] = useState({
    isOpen: false,
    error: '',
  });
  useEffect(() => {
    const require = async () => {
      const response = await CustomersApi.fetchSingleCustomers(customerId).then(
        value => value.data.customer
      );
      setCustomer(response);
    };
    require();
  }, []);

  // hide message
  useEffect(() => {
    setTimeout(() => {
      setMessage({ isOpen: false });
    }, 1000);
  }, [message]);

  function validateButtonEdit(customer) {
    if (customer.name !== '' && validator.validate(customer.email)) {
      return false;
    }
    return true;
  }

  function handleInputCustomer(event) {
    event.preventDefault();
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  }

  function showMessage(error) {
    const errMessage = error.response.data.errors;
    setMessage({
      ...message,
      isOpen: true,
      error: `${Object.keys(errMessage)} ${
        errMessage[Object.keys(errMessage)]
      }`,
    });
  }

  function handleEditUser(customer) {
    const newCustomerObject = customer;
    newCustomerObject.phone = newCustomerObject.phone.replace(/[^\d]+/g, '');
    CustomersApi.updateSingleCustomer(customerId, newCustomerObject)
      .then(value => value.status === 204 && history.push('/app/sample-page'))
      .catch((error) => {
        showMessage(error);
      });
  }

  const styles = useStyle();
  const matches = useMediaQuery('(min-width:820px)');

  if (customer.length !== 0) {
    return (
      <Grid item xs={12} sm={12} container className={styles.grid}>
        {matches ? (
          <LargeDevices
            handleEditUser={handleEditUser}
            customer={customer}
            EditCustomer={handleInputCustomer}
            validateBtn={validateButtonEdit}
          />
        ) : (
          <SmallDevices
            handleEditUser={handleEditUser}
            customer={customer}
            EditCustomer={handleInputCustomer}
            validateBtn={validateButtonEdit}
          />
        )}

        {message.isOpen && NotificationManager.error(message.error)}
        <NotificationContainer />
      </Grid>
    );
  }
  return <ProgressBar style={{ margin: '15px' }} />;
}
