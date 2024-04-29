import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Activate from "./containers/Activate";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/reset_password" Component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            Component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" Component={Activate} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
