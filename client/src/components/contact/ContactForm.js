import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ContactContext from '../../context/contacts/ContactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {
    const navigate = useNavigate();
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const {addContact, updateContact ,clearCurrent,current} = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const {name, email, phone, type} = contact;

    const onchange = e => setContact({...contact, [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name.trim().length ===0 || email.trim().length === 0 || phone.trim().length ===0 ){
        setAlert('Please enter all fields', 'danger');
        } else{
            // console.log("Register Contact");
            if(current === null){
                addContact(contact);
                console.log('Got Here' + contact);
            } else {
                updateContact(contact);
            }
            console.log("Register Contact");
            navigate('/');
        }
        

        
            
        
       
        
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    };
    
    const clearAll = () => {
        clearCurrent();
    }

  return (
    <div>
      <form onSubmit={onSubmit}>
          <h2 className='text-primary'>{current !==null ? 'Update Contact' : 'Add Contact'}</h2>
              <input type='text' placeholder='name' name='name' value={name} onChange={onchange} 
              />

              <input type='email' placeholder='Email' name='email' value={email} onChange={onchange} 
              />

              <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onchange} 
              />
            
              <h5>Contact Type</h5>
              <input type='radio' name="type" value='personal' checked={type === 'personal'} onChange={onchange} /> Personal{' '}

              <input type='radio' name="type" value='professional' checked={type === 'professional'} onChange={onchange} /> Professional
            <div>
                <input type='submit'  value={current !==null ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-blcok' />
            </div>
            {current && <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>}
      </form>
    </div>
  )
}

export default ContactForm
