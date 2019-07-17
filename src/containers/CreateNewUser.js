import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    hideMessage,
    showAuthLoader,
    showAuthMessage,
    userSignIn,
  } from 'actions/Auth';
  import {NotificationContainer, NotificationManager} from 'react-notifications';
  import IntlMessages from 'util/IntlMessages';
  import Button from '@material-ui/core/Button';


class CreateNewUser extends Component {

    componentDidUpdate() {
        if (this.props.showMessage) {
          setTimeout(() => {
            this.props.hideMessage();
          }, 100);
        }
    }

    render() {
        const {showMessage, alertMessage} = this.props;
        console.log(showMessage)
        return (
            <div>
            <Button onClick={() => {
                this.props.showAuthMessage("Erro");
                
                }} variant="contained" color="primary">
                <IntlMessages id="appModule.signIn"/>
            </Button>

                {showMessage && NotificationManager.error(alertMessage)}
                <NotificationContainer/>
            </div>
        )
    }
}
const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, authUser} = auth;
    return {loader, alertMessage, showMessage, authUser}
  };
  
  export default connect(mapStateToProps, {
    userSignIn,
    hideMessage,
    showAuthMessage,
    showAuthLoader,
  })(CreateNewUser);

  