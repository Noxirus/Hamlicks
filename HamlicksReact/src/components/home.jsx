import React from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../images/Hamlicks_LOGO.png";
import image2 from "../images/Carousel1.jpg";
import image3 from "../images/Carousel2.jpg";
import image4 from "../images/Carousel3.jpg";
import { Link } from "react-router-dom";

//TODO Change the styling for each page to a CSS page, makes it less messy
const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          height="700"
          width="500"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second Slide"
          height="700"
          width="500"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "black",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Welcome to Hamlicks!</h3>
          <p>Enter nice statement here</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          height="700"
          width="500"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "black",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Important!</h3>
          <p>This is a mock website to showcase on the developers portfolio</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image4}
          alt="Third slide"
          height="700"
          width="500"
        />

        <Carousel.Caption
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "black",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Experience</h3>
          <p>Constantly experimenting with new and interesting flavours</p>
          <Link
            className="nav-link center"
            to="/flavours"
            stye={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Click to see them here
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
