import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const { uid, token } = useParams();
  const [passwordReset, setPasswordReset] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password_confirm(uid, token, new_password, re_new_password);
    setPasswordReset(true);
  };
  // if user is authenticated, redirect to home page

  if (passwordReset) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="mt-5">
      <h1>Change Password</h1>
      <Form onSubmit={(e) => onSubmit(e)}>
        <FormGroup className="mb-3">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            name="new_password"
            placeholder="New Password"
            onChange={(e) => onChange(e)}
            value={new_password}
            minLength={6}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            name="re_new_password"
            placeholder="Confirm New Password"
            onChange={(e) => onChange(e)}
            value={re_new_password}
            minLength={6}
            required
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
    </Container>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
