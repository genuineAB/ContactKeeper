import React, {useReducer} from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REMOVE_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
   
} from '../Types' ;


const AuthState = props => {
    const initialState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User
    const loadUser = async () => {
        if(localStorage.token){
            console.log("token", localStorage.token)
            setAuthToken(localStorage.token);
        }


        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            const err = error.response
            console.log(err)
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
    //Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    //Login User
    const login = async formData => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);
console.log('token----', res.data);
            localStorage.setItem('token', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
            formData.navigate("/");
        } catch (error) {
            
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            })
        }
    }

    //Logout
    const logout = () => dispatch({
        type: LOGOUT
    }) ;
 
    //Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    });

    
    return (
        <AuthContext.Provider 
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login, 
            clearErrors,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )

    
};

export default AuthState;