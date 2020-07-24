import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import chickyImage from "../images/Chicky.png";
import { Container, Row, Col } from "react-bootstrap";

//TODO Make the text forms for the login window a bit smaller maybe? (they dont need to be this long)
class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <Container className="back">
        <Row>
          <Col xs={12} md={7}>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </Col>
          <Col xs={12} md={5}>
            <img
              className="center"
              src={chickyImage}
              alt="Thats one cool chick"
              height="400"
              width="300"
              margin="auto"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
