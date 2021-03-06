import React, {useContext, useRef, useEffect} from 'react';
import ContactContext from '../../context/contacts/ContactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    })

    const {filterContacts, clearFilter, filtered} = contactContext;

    const onChange = e => {
        if(text.current.value !==''){
            filterContacts(e.target.value);
        }else{
            clearFilter();
        }
    }

  return ( 
    <form>
      <input ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange}/>
    </form> 
  )
}

export default ContactFilter
