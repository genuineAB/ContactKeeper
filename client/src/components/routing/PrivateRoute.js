import React, {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

// const PrivateRoute = ({element: Component, ...rest}) => {
//     const authContext = useContext(AuthContext);
//     const {isAuthenticated, loading} = authContext; 

//   return (
//        <Route {...rest} render={props => !isAuthenticated && !loading ? (
//            <Navigate to='/login' />
//        ) : (
//           <Component {...props} />
//        )}
//     />
//   )
// }
// const useAuth =()=>{
//     return true;
// }



const PrivateRoute = () => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;


    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
      }, []);
      
    return isAuthenticated && !loading ? <Outlet /> : <Navigate to="/login" />
    // return isAuthenticated && !loading ? <Navigate to='/' /> : <Navigate to="/login" />
}

// const PrivateRoute = ({component: Component}) =>{
//     const authContext = useContext(AuthContext);
//     const {isAuthenticated, loading} = authContext;
    
//     return(
        
        
//           !isAuthenticated && !loading ? (<Navigate to='/login'/>) : <Component />
        
        
//     )

    
// }

export default PrivateRoute
 