import React from "react";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../images/Hamlicks_LOGOCropped.png";
import image2 from "../images/Carousel1.jpg";
import image3 from "../images/Carousel2.jpg";
import image4 from "../images/Carousel3.jpg";
import { Link } from "react-router-dom";

//TODO Change the styling for each page to a CSS page, makes it less messy
const Home = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="w-100 iceCreamImage" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="w-100 iceCreamImage" src={image2} alt="Second Slide" />

        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselHeader">Welcome to Hamlicks!</h3>
          <p className="carouselText">
            Where new ideas turn into interesting flavours
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="w-100 iceCreamImage" src={image3} alt="Third slide" />

        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselHeader">Important!</h3>
          <p className="carouselText">
            This is a mock website to showcase on the developers portfolio
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="w-100 iceCreamImage" src={image4} alt="Third slide" />

        <Carousel.Caption className="carouselCaption">
          <h3 className="carouselHeader">Experience</h3>
          <p className="carouselText">Check out our flavours!</p>
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
