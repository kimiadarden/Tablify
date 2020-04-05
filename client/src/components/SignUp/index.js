import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import Container from '../Container'
import Jumbotron from '../Jumbotron'
import './signupstyle.css';

const SignUpPage = () => (
  <div>
    <Container>
      <Jumbotron>
        <div className="row">
          <div class="col-md-12 login-box">
            <h1 className="text-center" style={{fontFamily: "'Fredoka One', cursive"}}>Sign Up</h1>
            <br />
            <SignUpForm />
            <p style={{textAlign: "center", fontFamily: "monospace"}}>
              Already have an account? <Link to={ROUTES.SIGN_IN} style={{fontFamily: "'Marck Script', cursive", fontSize: "20px", textDecoration: "underline"}}>Sign in</Link>
            </p>
          </div>
        </div>
      </Jumbotron>
    </Container>
  </div>
);

//setting the initial state
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

  const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign in with one of them. Afterward, associate your accounts
    on your personal account page.
  `;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  //adding the return ***
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
   
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      // .then(() => {
      //   return this.props.firebase.doSendEmailVerification();
      // })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };
  // onSubmit = event => {
  //   const { username, email, passwordOne } = this.state;
  //   this.props.firebase
  //     .doCreateUserWithEmailAndPassword(email, passwordOne)
  //     .then(authUser => {
  //       this.setState({ ...INITIAL_STATE });
  //       this.props.history.push(ROUTES.HOME);
  //     })
  //     .catch(error => {
  //       this.setState({ error });
  //     });
  //   event.preventDefault();
  // }



  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group text-center">
          <input
            style={{margin: "auto", marginTop: "1%", marginBottom: "1%"}}
            className="form-control input2"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group text-center">
          <input
            style={{margin: "auto", marginTop: "1%", marginBottom: "1%"}}
            className="form-control input2"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group text-center">
          <input
            style={{margin: "auto", marginTop: "1%", marginBottom: "1%"}}
            className="form-control input2"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group text-center">
          <input
            style={{margin: "auto", marginTop: "1%", marginBottom: "5%"}}
            className="form-control input2"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group text-center">
          <button disabled={isInvalid} type="submit" className="btn btn-primary">Sign Up</button>
        </div>
        <div style={{margin: "0 auto", fontStyle: "monospace"}} className="text-center">
          {error && <mark>{error.message}</mark>}
        </div>
      </form>
    );
  }
}
const SignUpLink = () => (
  <p style={{textAlign: "center", fontFamily: "monospace"}}>
    Don't have an account? <Link to={ROUTES.SIGN_UP} style={{fontFamily: "'Marck Script', cursive", fontSize: "20px", textDecoration: "underline"}}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };