import React from 'react';
import { Link } from "react-router-dom";
import { AuthUserContext, withAuthorization } from '../../components/Session';
import PasswordChangeForm from '../../components/PasswordChange';
import Jumbotron from '../../components/Jumbotron'
import Container from '../../components/Container'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container>
          <Jumbotron>
            <div className="Row">
              <div className="col-md-4 offset-md-4">
                <h1>Account: {authUser.email}</h1>
                <br />
                <PasswordChangeForm />
                <br />
                <Link to="/Employees">
                  <button className="login-button">Employees</button>
                </Link>
              </div>
            </div>
          </Jumbotron>
        </Container>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);