import React from "react";
import aboutImage from "../images/About.png";
import mintyImage from "../images/Minty.png";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className="back">
      <h1 className="center">About Hamlicks</h1>
      <p>
        This is a website for a fake ice cream company, as a side passion of
        mine I love making ice cream and experimenting with new interesting
        flavours
      </p>
      <p>
        The website itself has been created with React components as well as
        accesses its information from Mongo DB, the backend service is created
        with Node JS, express and a variety of security libraries.
      </p>
      <h2>Details</h2>
      <Row>
        <Col xs={12} md={6}>
          <p>
            The flavours page is organized via pagination and you are able to
            sort each column either via descending or ascending order. Your
            favoured flavours will be saved to your account and remembered next
            time you log in.
          </p>
          <p>
            When logged in the navigation bar will change accordingly (also
            based on your security level). If you attempt to access a page you
            are not allowed to access it will prompt you to log in first before
            redirecting you back to the page you wished to see.
          </p>
          <p>
            When registering a new account the validation will auto update as
            you type. Informing you if your information is accurate. The
            register button is not clickable until the form has been filled out
            correctly
          </p>
        </Col>
        <Col className="center" xs={9} md={6}>
          <img
            className="center"
            src={mintyImage}
            alt="Does that ice cream have.. ears?"
            height="auto"
            width="300"
            margin="auto"
          />
        </Col>
      </Row>
      <h2>Security</h2>
      <p>
        The website also has tiered access, if you are registered as a user and
        admin you will be able to view other profiles, edit and delete flavours
        (and profiles as well). Regular users will be able to view their
        information as well as update it.
      </p>
      <p>
        Passwords are hash encrypted with B-Crypt for additional levels of
        security. When logging in your computer will be passed a Json web token
        to verify your account details.
      </p>
      <p>Artwork by Yu Nakamura</p>
      <img
        className="d-block w-100"
        src={aboutImage}
        alt="Shiba wants Ice Cream!"
        height="500"
        width="250"
      />
    </Container>
  );
};

export default About;
