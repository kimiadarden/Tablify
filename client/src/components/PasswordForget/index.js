import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Jumbotron from '../Jumbotron'
import Container from '../Container'

const PasswordForgetPage = () => (
  <div>
    <Container>
    <Jumbotron>  
    <div className="Row">
    <div className="col-md-12 login-box">
    <h1 className="text-center" style={{fontFamily: "'Fredoka One', cursive"}}>Reset Password </h1>
    <PasswordForgetForm />
    </div>
        </div>
    </Jumbotron>
    </Container>
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
         <div className="form-group text-center">
        <input
         style={{margin: "auto", marginTop: "1%", marginBottom: "1%"}}
         className="form-control input2"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          />
          </div>
          <div className="form-group text-center">

        <button disabled={isInvalid} type="submit" className="btn btn-primary">
          Reset My Password
        </button>
          </div>

          <div style={{margin: "0 auto", fontStyle: "monospace"}} className="text-center">
          {error && <mark>{error.message}</mark>}
        </div>	       

      </form>
    );
  }
}
const PasswordForgetLink = () => (
  <p style={{textAlign: "center", marginTop: "5%"}}>
    <Link to={ROUTES.PASSWORD_FORGET} style={{fontFamily: "'Marck Script', cursive", fontSize: "20px", textDecoration: "underline"}}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };