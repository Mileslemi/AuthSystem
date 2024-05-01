import React from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  return (
    <Container>
      <h1 className="display-4">Welcome to Auth System!</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      {isAuthenticated ? (
        <p>You Are Logged In!</p>
      ) : (
        <>
          {" "}
          <p>Click the Log In button</p>
          <p className="lead">
            <Button as={Link} to={"/login"}>
              Login
            </Button>
          </p>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
