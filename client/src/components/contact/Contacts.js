import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ContactContext from '../../context/contacts/ContactContext';
import ContactItems from './ContactItems';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, filtered, getContacts, loading} = contactContext;

    useEffect(() => {
      getContacts();
      //eslint-disable-next-line
    }, [])


    if(contacts !== null &&contacts.length === 0 && !loading){
      return <h4>Please Add a Contact</h4>
    }
    // console.log(contacts.props.name);
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
        {filtered !== null ? filtered.map(contact => <CSSTransition key= {contact._id} timeout={500} classNames='alert'> 
        <ContactItems contact={contact}/>
        </CSSTransition >) : contacts.map(contact => <CSSTransition key={contact._id} timeout={500} classNames='alert'><ContactItems  contact={contact}/>
        </CSSTransition> )} 
    </TransitionGroup>
      ) : <Spinner />}

        {/* <TransitionGroup>
          {filtered !== null ? filtered.map(contact => <CSSTransition key= {contact._id} timeout={500} classNames='alert'> 
          <ContactItems contact={contact}/>
          </CSSTransition >) : contacts.map(contact => <CSSTransition key={contact._id} timeout={500} classNames='alert'><ContactItems  contact={contact}/>
          </CSSTransition> )} 
      </TransitionGroup> */}
    </Fragment> 
  ) 
}

export default Contacts
