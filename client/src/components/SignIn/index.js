import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Jumbotron from '../Jumbotron'
import Container from '../Container'
import './signinstyle.css';

const SignInPage = () => (
  <div>
    <Container>
      <Jumbotron>
        <div className="row">
          <div className="col-md-12 login-box">
            <h1 className="text-center" style={{fontFamily: "'Fredoka One', cursive"}}>Sign In</h1>
            <br />
            <SignInForm />
            <PasswordForgetLink />
            <SignUpLink />
          </div>
        </div>
      </Jumbotron>
    </Container>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <div class="form-group text-center">
        <input
          style={{marginTop: "4%"}}
          className="input"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div class="form-group text-center">
        <input
          style={{marginBottom: "5%"}}
          className="input"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <div class="form-group text-center">
        <button disabled={isInvalid} type="submit" className="btn btn-primary">
          Continue
        </button>
        </div>
        <div style={{margin: "0 auto"}} className="text-center">
          {error && <mark className="error-message">{error.message}</mark>}
        </div>
      </form>
    );
  };
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };