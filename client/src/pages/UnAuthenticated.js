import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import PUBLIC_ROUTES from '../routes/publicRoutes';
import Navbar from "components/layout/Navbar";

const AppWrapper = () => {
    const routes = useRoutes(PUBLIC_ROUTES);
    return routes;
}


const UnAuthenticated = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <AppWrapper />
      
    </Router>
  )
}

export default UnAuthenticated
