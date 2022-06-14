import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactState from './context/contacts/ContactState';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import Register from './components/auth/Register';
import AuthState from './context/auth/AuthState';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import AlertState from './context/alert/AlertState';
import Pages from './pages';


if(localStorage.token){
  setAuthToken(localStorage.token)
};
 const App = () => {
// return <Pages />

  return (
    <AuthState>
      
      <ContactState>
        <AlertState>
            <Fragment>
              <div className='container'>
                <Alerts />
                <Pages />
              </div>
            </Fragment>
        </AlertState>
      </ContactState>
      
    </AuthState>
  );
}

export default App;
