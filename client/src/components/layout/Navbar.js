import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contacts/ContactContext';


const Navbar = ({title, icon}) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);


  const{isAuthenticated, logout, user} = authContext;
  const{clearContacts} = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authNavLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i><span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestNavLinks = (
    <Fragment>
        <li>
            <NavLink to='/register'>Register</NavLink>
        </li><li>
            <NavLink to='/login'>Login</NavLink>
        </li>

    </Fragment>
  ) 
  

 
  return (
    <div className="navbar bg-primary">
       
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authNavLinks: guestNavLinks}
      </ul>
    </div>
  ) 
} 
Navbar.propType = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
