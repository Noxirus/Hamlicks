import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import strawPiggyImage from "../images/Strawpiggy.png";
import { Container, Row, Col } from "react-bootstrap";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Container className="back">
        <Row>
          <Col>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Register")}
            </form>
          </Col>
          <Col>
            <img
              className="center"
              src={strawPiggyImage}
              alt="Strawpiggy"
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

export default RegisterForm;
