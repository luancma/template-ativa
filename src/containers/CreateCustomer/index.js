import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useMediaQuery } from '@material-ui/core';
import validator from 'email-validator';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { masks } from 'util/masks';
import { formControll } from './styles';
import { actionCreateUser, hideMessageFaild } from '../../actions/User';
import SmallDevices from './SmallDevices';
import DefaultDevices from './DefaultDevices';

function CreateUser({ history }) {
  const dispatch = useDispatch();

  const userMessage = useSelector(state => state.user);

  useEffect(() => {
    if (userMessage.showMessageSuccess) {
      history.push('/app/list');
    }
  });

  useEffect(() => {
    if (userMessage.showMessageFaild === true) {
      setTimeout(() => {
        dispatch(hideMessageFaild());
      }, 100);
    }
  });

  // const [state, setState] = React.useState({
  //   checkedCreate: false,
  //   checkedRead: false,
  //   checkedUpdate: false,
  //   checkedDelete: false,
  // });

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [citys, setCitys] = useState({
    citys: ['Maceió', 'Recife', 'São Paulo', 'Rio Grande do Sul'],
  });
  const [values, setValues] = useState({
    state: '',
    citys: '',
  });

  function handleChangeCitySelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleChangeSelect(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleInputEmail = (event) => {
    setCustomerEmail(event.target.value);
  };

  const handleInputName = (event) => {
    setCustomerName(event.target.value);
  };

  const handleInputPhone = (event) => {
    console.log(masks.mascararTel(event.target.value));
    setCustomerPhone(masks.mascararTel(event.target.value));
  };

  function validateEmail() {
    if (validator.validate(customerEmail)) return true;
    return false;
  }

  function handleCustomer() {
    const userObject = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      state: customerState,
      city: citys,
    };
    dispatch(actionCreateUser(userObject));
  }

  function validateButton() {
    if (
      customerName.trim() !== ''
      && validateEmail()
      && customerPhone.trim() !== ''
      && values.state.trim() !== ''
      && values.citys.trim() !== ''
    ) {
      return true;
    }
    return false;
  }

  const matches = useMediaQuery('(min-width:820px)');
  return (
    <Grid item xs={12} sm={12} container style={formControll}>
      {matches ? (
        <DefaultDevices
          handleChangeCitySelect={handleChangeCitySelect}
          handleChangeSelect={handleChangeSelect}
          citys={citys.citys}
          values={values}
          validateEmail={validateEmail}
          handleInputEmail={handleInputEmail}
          handleInputName={handleInputName}
          handleInputPhone={handleInputPhone}
          customerEmail={customerEmail}
          customerName={customerName}
          customerPhone={customerPhone}
          customerState={customerState}
          validateButton={validateButton}
          handleCustomer={handleCustomer}
        />
      ) : (
        <SmallDevices
          validateEmail={validateEmail}
          handleInputEmail={handleInputEmail}
          handleInputName={handleInputName}
          handleInputPhone={handleInputPhone}
          customerEmail={customerEmail}
          customerName={customerName}
          customerPhone={customerPhone}
          customerState={customerState}
          validateButton={validateButton}
          handleCustomer={handleCustomer}
        />
      )}
      {userMessage.showMessageFaild
        && NotificationManager.error(userMessage.alertMessage)}
      <NotificationContainer />
    </Grid>
  );
}

export default CreateUser;
