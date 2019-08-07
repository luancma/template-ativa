import React, { useState, useEffect } from 'react';
import { CustomersApi } from 'api/CustomersApi';
import { Grid, useMediaQuery } from '@material-ui/core';
import validator from 'email-validator';
import { LargeDevices } from './LargeDevices';
import { SmallDevices } from './SmallDevices';
import ProgressBar from './ProgressBar';
import { useStyle } from './editStyles';

export default function EditCustomer({ location, history }) {
  const { customerId } = location.state;
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    const require = async () => {
      const response = await CustomersApi.fetchSingleCustomers(customerId).then(
        value => value.data.customer
      );
      setCustomer(response);
    };
    require();
  }, []);

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

  function handleEditUser(customer) {
    setCustomer((customer.phone = customer.phone.replace(/[^\d]+/g, '')));
    CustomersApi.updateSingleCustomer(customerId, customer);
    history.push('/app/sample-page');
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
      </Grid>
    );
  }
  return <ProgressBar style={{ margin: '15px' }} />;
}
