import React, {useReducer} from 'react';
import axios from 'axios';
// import {v5 as uuid} from 'uuid';
import contactContext from './ContactContext';
import contactReducer from './ContactReducer';

import { 
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CLEAR_CONTACT,
    SET_ALERT,
    REMOVE_ALERT,
    CONTACT_ERROR
} from '../Types' ;


const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);


    //GET Contact
    const getContacts = async contact => { 
        
        try {
            const res = await axios.get('api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

       
    }

    //Add Contact 
    const addContact = async contact => { 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

       
    }
 
    //Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`api/contacts/${id} `);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

       
        
    }

    //Update Contact

    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        try {
            const res = await axios.put(`api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT, 
                payload: res.data
            });
        }
        catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //Clear contacts
    const clearContacts = contact => {
        dispatch({
            type:   CLEAR_CONTACT
        })
        
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    //Clear Current Contact
    const clearCurrent = contact => {
        dispatch({type:   CLEAR_CURRENT});
    }

    


    //Filter Contact
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACT, payload: text});
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }

    //Set Alert

    //Remove Alert

    return (
        <contactContext.Provider 
        value={{
            contacts:state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
            
        }}>
            {props.children}
        </contactContext.Provider>
    )

    
};

export default ContactState;