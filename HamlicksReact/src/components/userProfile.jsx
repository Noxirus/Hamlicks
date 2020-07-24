import React from "react";
import Content from "./common/content";
import { getUser } from "../services/userService";
import { getCurrentUser } from "../services/authService";
import { getFlavour } from "../services/flavourService";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import piggyImage from "../images/Piggy.png";

class UserProfile extends Content {
  state = {
    data: {
      email: "",
      name: "",
      favorites: [],
    },
  };

  //Will need to be added to the backend service as well
  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      const token = await getCurrentUser();
      //Check if the user token isnt admin or the users Id
      if (token._id !== userId && !token.isAdmin)
        return this.props.history.replace("/not-found");
      const { data: user } = await getUser(userId);

      //Get users favorite flavours
      if (user.favorites.length > 0) {
        let favoritesList = [];
        for (let i = 0; i < user.favorites.length; i++) {
          let flavourName = await getFlavour(user.favorites[i]);
          favoritesList.push(flavourName.data.name);
        }
        this.setState({ favorites: favoritesList });
      }

      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    };
  }

  render() {
    //TODO make this particular section look nice, maybe let people pick their own picture?
    let favoritesList = [];
    if (this.state.data.favorites.length === 0) {
      favoritesList.push(<p key="1">No favorites currently</p>);
    }
    for (let i = 0; i < this.state.data.favorites.length; i++) {
      favoritesList.push(
        <React.Fragment key={i}>
          <Link to={`/flavours/${this.state.data.favorites[i]}`}>
            {this.state.favorites[i]}
          </Link>
          <br />
        </React.Fragment>
      );
    }

    return (
      <Container className="back">
        <Row>
          <Col xs={12} md={7}>
            <h1>{this.state.data.name}</h1>
            <p>{this.state.data.email}</p>
            <h3>Favorite Flavours</h3>
            {favoritesList}
            <br />
            <Link to={`/usersedit/${this.state.data._id}`}>
              <button className="btn btn-primary btn-sm">Edit</button>
            </Link>
          </Col>
          <Col xs={12} md={5}>
            <img
              className="center"
              src={piggyImage}
              alt="Oink Oink"
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

export default UserProfile;
