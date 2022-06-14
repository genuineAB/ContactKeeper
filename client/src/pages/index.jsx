import Authenticated from './Authenticated';
import AuthContext from 'context/auth/AuthContext';
import React, {useContext, useEffect} from 'react';

import UnAuthenticated from './UnAuthenticated';


const Pages = () => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading, loadUser} = authContext;
    const isAuthUser = localStorage?.token;

    useEffect(() => {
        loadUser();
    },[]) ;
        
    if(loading ){
        return <div>I am Loading...</div>
    }
    
    console.log(isAuthenticated);
    if(isAuthenticated){
        return <Authenticated />

    }
    return <UnAuthenticated />
};

export default Pages;