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


if(localStorage.token){
  setAuthToken(localStorage.token)
};
 const App = () => {
  return (
    <AuthState>
      
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route exact path='/' element={<PrivateRoute />} >
                    <Route exact path='/' element={<Home />} />
                  </Route>
                  <Route exact path='/about' element={<About />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />

                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
      
    </AuthState>
  );
}

export default App;
