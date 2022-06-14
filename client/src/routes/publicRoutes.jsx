import { Navigate } from "react-router-dom";
import {PROTECTED_PATHS, PUBLIC_PATHS} from './pagePath';
// import Login from '../pages/Login';
import Login from "pages/Login";



const {LOGIN}  = PUBLIC_PATHS;

const PUBLIC_ROUTES = [
    {path: LOGIN, element: <Login /> },
    // {path: LOGIN, element: <div>See You</div> },
    {path: '/' ,element: <Navigate to={LOGIN} />},

    {path: '*', element: <div>Page Not Found</div>},
];

export default PUBLIC_ROUTES;