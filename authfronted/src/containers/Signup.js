import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sign_up } from "../actions/auth";

const Signup = ({ sign_up, isAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      sign_up(name, email, password, re_password);
      navigate("/");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container className="mt-5">
      <h1>Sign Up</h1>
      <p>Create An Account</p>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3">
          <Form.Label>Name</Form.Label>
          <FormControl
            type="text"
            name="name"
            placeholder="Full names"
            onChange={(e) => onChange(e)}
            value={name}
            required
          />
        </FormGroup>
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
        <FormGroup className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            name="re_password"
            placeholder="Confirm Password"
            onChange={(e) => onChange(e)}
            value={re_password}
            minLength={6}
            required
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <p className="mt-3">
        Have an account? <Link to={"/login"}>Login</Link>
      </p>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { sign_up })(Signup);
