import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import { Link, Navigate } from "react-router-dom";

const ResetPassword = ({ reset_password }) => {
  const [email, setEmail] = useState();

  const [requestSent, setRequestSent] = useState(false);

  const onChange = (str) => {
    setEmail(str);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container className="mt-5">
      <h1>Reset Password</h1>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3">
          <Form.Label>Email</Form.Label>
          <FormControl
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => onChange(e.target.value)}
            value={email}
            required
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
      <p className="mt-3">
        Have an account? <Link to={"/login"}>Login</Link>
      </p>
    </Container>
  );
};

export default connect(null, { reset_password })(ResetPassword);
