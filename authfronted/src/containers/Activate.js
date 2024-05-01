import React from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../actions/auth";

const Activate = ({ verify }) => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const activateAccount = () => {
    verify(uid, token);
    navigate("/");
  };
  return (
    <Container>
      <h5>Verify Your Account</h5>
      <Button onClick={activateAccount}>Activate</Button>
    </Container>
  );
};

export default connect(null, { verify })(Activate);
