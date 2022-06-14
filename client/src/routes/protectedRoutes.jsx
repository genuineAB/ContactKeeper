import { Navigate } from "react-router-dom";
import {PROTECTED_PATHS, PUBLIC_PATHS} from './pagePath';




const {DASHBOARD}  = PROTECTED_PATHS;

const PROTECTED_ROUTES = [
    {path: DASHBOARD, element: <div>See YOU</div>},
    {path: '/' ,element: <Navigate to={DASHBOARD} />},

    {path: '*', element: <div>Page Not Found</div>},
];

export default PROTECTED_ROUTES;