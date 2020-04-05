import React, { Fragment} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import FrontDesk from './pages/Frontdesk';
import Kitchen from './pages/Kitchen';
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import PasswordForgetPage from './components/PasswordForget';
import { withAuthentication } from './components/Session';
import Account from './pages/Account';
import Employees from './pages/Employees';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/FrontDesk" component={FrontDesk} />
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/pw-forget" component={PasswordForgetPage} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Kitchen" component={Kitchen} />
      <Route exact path="/Account" component={Account} />
      <Route exact path="/Employees" component={Employees} />
    </Fragment>
  </Router>
)

export default withAuthentication(App);
