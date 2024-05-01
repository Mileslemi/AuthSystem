import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  // if user is authenticated, redirect to home page

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="mt-5">
      <h1>Sign In</h1>
      <p>Sign Into your Account</p>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3">
          <Form.Label>Email</Form.Label>
          <FormControl
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => onChange(e)}
            value={email}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => onChange(e)}
            value={password}
            minLength={6}
            required
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
      </p>
      <p className="mt-3">
        Forgot your Password? <Link to={"/reset_password"}>Reset Password</Link>
      </p>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// The connect() function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
export default connect(mapStateToProps, { login })(Login);
