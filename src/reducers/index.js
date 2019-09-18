import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import User from './User';
import Contracts from './Contracts';
import Customers from './Customers';
import Form from './FormCreate';

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    user: User,
    contracts: Contracts,
    customers: Customers,
    formErrors: Form,
  });
